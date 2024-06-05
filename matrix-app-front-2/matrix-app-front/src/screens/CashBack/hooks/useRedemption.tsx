import { ProcessingPayment } from 'assets/lottie';
import React, {
  useEffect, useState, useCallback, useRef,
} from 'react';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { useInterval } from 'usehooks-ts';
import { REDEMPTION_ERROR_CODE, REDEMPTION_STATUS } from 'src/utils/constants';
import LottieView from 'lottie-react-native';
import CashbackServices from 'src/api/CashbackServices';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics } from 'src/utils/Analytics';
import { formatDate } from 'src/utils/date-time/date-time';
import Helpers from 'src/utils/Helpers';
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native';

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

export const useRedemption = (props: NavigationPropsType) => {
  const { navigation } = props;
  const [progress, setProgress] = useState(0);
  const [screenContent, setScreenContent] = useState(screensStatus[0]);
  const account = useSelector((state) => state.redemption.account);
  const pointsExchangeRate = useSelector((state) => state.redemption.rules.pointsExchangeRate);
  const amountEntered = useSelector((state) => state.redemption.amountEntered);
  const email = useSelector((state) => state.session.user.email);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
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
    const data = await CashbackServices.redemptionStatus(redemptionId);
    if (data?.status === REDEMPTION_STATUS.requested) {
      return new Promise((resolve) => {
        setTimeout(() => resolve(redemptionStatus(redemptionId)), 600);
      });
    }
    return data;
  };

  const onPressContinue = async () => {
    try {
      navigation.navigate('RedemptionLoading');
      setIsButtonEnabled(true);
      const params = { account, points: (amountEntered / pointsExchangeRate) };
      const operation = await CashbackServices.redemptionProcessing(params);

      const data : any = await redemptionStatus(operation.redemptionId);
      if (data?.status === REDEMPTION_STATUS.completed) {
        navigate(navigationScreenNames.redemption.validationSuccess, {
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
          navigate(navigationScreenNames.redemption.validationError, {
            type: 'error',
            errorBlocked: true,
          });
        } else if (data?.errorCode === REDEMPTION_ERROR_CODE.invalid_points
          || data?.errorCode === REDEMPTION_ERROR_CODE.provider_error
          || data?.errorCode === REDEMPTION_ERROR_CODE.invalid_card_status) {
          navigate(navigationScreenNames.redemption.validationError, {
            type: 'warning',
            errorBlocked: false,
          });
        } else {
          navigate(navigationScreenNames.redemption.validationError, {
            type: 'warning',
            errorBlocked: false,
          });
        }
      }
    } catch (err) {
      logCrashlytics({
        scope: 'API',
        fileName: 'CashBack/hooks/useRedemption.tsx',
        service: 'redemptionProcessing',
        error: err,
      });
      navigate(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      });
    }
  };

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return {
    onPressBackArrow,
    onPressContinue,
    progress,
    screenContent,
    StatusImage,
    isButtonEnabled,
    inputRef,
    redemptionStatus,
  };
};

export default useRedemption;
