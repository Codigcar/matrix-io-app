import React, { useCallback, useEffect, useState } from 'react';
import { ProcessingPayment } from 'assets/lottie';
import { BackHandler } from 'react-native';
import { useInterval } from 'usehooks-ts';
import LottieView from 'lottie-react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { REDEMPTION_ERROR_CODE, REDEMPTION_STATUS } from 'src/utils/constants';
import Helpers from 'src/utils/Helpers';
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';
import { logCrashlytics } from 'src/utils/Analytics';
import { RedemptionRoutesEnum } from 'src/shared/enums/routes/redemption-routes-enum';
import { formatDate } from 'src/utils/date-time/date-time';
import { useCashBackSelectors, useUserSelectors } from 'src/core/libraries-implementation/state-manager/selectors';
import { useRedemptionLoadingInteractor } from './redemption-loading.interactor';
import { RedemptionProps } from '../../shared/types';
import RedemptionAnalytics from '../../analytics/redemption.analytics';

const screensStatus = [

  {
    id: 1,
    title: i18n.t('cashBack:redemptionLoading.completing.title'),
    description: i18n.t('cashBack:redemptionLoading.completing.description'),
    image: ProcessingPayment,
    minValue: 0,
  },

];

const getScreenStatus = (progress: number) =>
  screensStatus.find((screen) => progress >= screen.minValue) || screensStatus[0];

export const useRedemptionLoadingPresenter = (props: RedemptionProps & NavigationPropsType) => {
  const { navigation, ...values } = props;
  const { email } = useUserSelectors();
  const [screenContent, setScreenContent] = useState(screensStatus[0]);
  const [progress, setProgress] = useState(0);
  const { pointsExchangeRate } = useCashBackSelectors();
  const { executeRedemption, executeRedemptionStatus } = useRedemptionLoadingInteractor();

  useEffect(() => {
    RedemptionAnalytics.onProcessingCashback();
  }, []);

  useEffect(() => {
    const newContent = getScreenStatus(progress);
    if (screenContent.id !== newContent.id) {
      setScreenContent(newContent);
    }
  }, [progress]);

  useInterval(
    () =>
      setProgress((old) => {
        const newValue = old + Math.round(Math.random() * 10);
        return newValue <= 99 ? newValue : 99;
      }),
    progress <= 99 ? 1000 : null,
  );

  const StatusImage = useCallback(
    () => <LottieView source={screenContent.image} autoPlay loop resizeMode="cover" />,
    [screenContent],
  );

  const navigate = (screen: string, params?: object) => {
    setProgress(100);
    setTimeout(() => navigation.navigate(screen, params), 1000);
  };

  const redemptionStatus = async (redemptionId: string) => {
    const data = await executeRedemptionStatus(redemptionId);
    if (data?.status === REDEMPTION_STATUS.requested) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(redemptionStatus(redemptionId)), 600);
      });
    }
    return data;
  };

  const onSubmit = async () => {
    try {
      const operation = await executeRedemption(values.route.params.send);
      const data : any = await redemptionStatus(operation.redemptionId);

      if (data?.status === REDEMPTION_STATUS.completed) {
        navigate(RedemptionRoutesEnum.REDEMPTION_SUCCESS, {
          date: formatDate(data.lastUpdate, 'dddd[,] DD [de] MMMM [del] YYYY'),
          hour: formatDate(data.lastUpdate, 'hh:mm a'),
          amountMoney: Helpers.formatCurrency(
            data.points * pointsExchangeRate,
            { removeDecimalsWhenRounded: false },
          ),
          accountNumber: Helpers.limitAccountNumberString(data.card.alias, 8),
          email: maskData(email, 'email', 2),
        });
      } else if (data?.status === REDEMPTION_STATUS.failed) {
        if (data?.errorCode === REDEMPTION_ERROR_CODE.invalid_card_account) {
          navigate(RedemptionRoutesEnum.REDEMPTION_ERROR, {
            type: 'error',
            errorBlocked: true,
          });
        } else if (data?.errorCode === REDEMPTION_ERROR_CODE.invalid_points
          || data?.errorCode === REDEMPTION_ERROR_CODE.provider_error
          || data?.errorCode === REDEMPTION_ERROR_CODE.invalid_card_status) {
          navigate(RedemptionRoutesEnum.REDEMPTION_ERROR, {
            type: 'warning',
            errorBlocked: false,
          });
        } else {
          navigate(RedemptionRoutesEnum.REDEMPTION_ERROR, {
            type: 'warning',
            errorBlocked: false,
          });
        }
      }
    } catch (err) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/screens/redemption-loading/redemption-loading.presenter.tsx',
        service: 'executeRedemptionStatus',
        error: err,
      });
      navigation.navigate(RedemptionRoutesEnum.REDEMPTION_ERROR, {
        type: 'warning',
        errorBlocked: false,
      });
    }
  };

  useEffect(() => {
    onSubmit();
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return {
    progress,
    screenContent,
    StatusImage,
  };
};
