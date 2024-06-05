import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import { android, rem } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import {
  analyticsManagerProvider,
  AnalyticsProviderType,
} from 'src/shared/providers/analytics/index';
import { DigitalCard, DigitalCardGray, CardInfo, VisaLogo } from 'assets/svgs';
import I2CModule from 'src/components/I2cSdk/I2CModule';
import { Box, Text } from 'matrix-ui-components';
import { logCrashlytics } from 'src/utils/Analytics';
import { CardTrashBg } from 'assets/icons';
import { useNetInfo } from '@react-native-community/netinfo';
import useAppState from 'src/components/CreditCard/hooks/useAppState';
import ConfirmModal from 'src/components/confirm-modal';
import { EyeIconSkeleton } from 'src/screens/Home/components/skeleton/CreditCardSkeleton';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { useIsFocused } from '@react-navigation/native';
import ConsumedCard from './components/ConsumedCard';
import useDeliquentValues from '../../screens/Home/components/hooks/useDelinquentValues';
import styles from './styles/MtxCreaditCardStyle';
import useCreditCard from './hooks/useCreditCard';

const isMultiCurrencyStatusSelector = (state: RootState) => state.cards.isMultiCurrency;
type CreditCardTypeProps = {
  testID?: string;
  isInfoButtonDisabled?: boolean;
  consumed: {
    PEN: {
      amount: number;
      currency: string;
    };
    USD: {
      amount: number;
      currency: string;
    };
  };
  disabled?: boolean;
  balanceLoading: boolean;
  errorServiceBalance: boolean;
  isLoadingCards: boolean;
  showBalance?: boolean;
};

const CreditCard = ({
  testID,
  isInfoButtonDisabled,
  consumed,
  disabled,
  balanceLoading,
  errorServiceBalance,
  isLoadingCards,
  showBalance,
}: CreditCardTypeProps) => {
  const {
    cardReferences,
    isLoading,
    timerToFinishTask,
    isCardEnable,
    setHasErrorI2C,
    hasErrorI2C,
  } = useCreditCard();
  const credentialsI2C = cardReferences.cardRefNo && cardReferences.authToken;
  const {
    i2cEvents, revealCardInfo, finishTask, finishTaskTimeOut,
  } = I2CModule;
  const { isConnected } = useNetInfo();
  const [i2cErrorModal, setI2cErrorModal] = useState<boolean>(false);
  const [onExistCurrentRevealCardInfo, setOnExistRevealCardInfo] = useState<boolean>(false);
  const [onLoadingStarted, setOnLoadingStarted] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const isMultiCurrencyStatus = useSelector(isMultiCurrencyStatusSelector);
  const { isCardDelinquentDisabled, isCardDelinquentIdle } = useDeliquentValues();
  useAppState({ statusRevealCardInfo: onLoadingStarted });

  useEffect(() => {
    if (isFocused) {
      i2cEvents.addListener('onError', (log: { errorCode: string; errorDescription: string }) => {
        if (log.errorCode !== '-999') {
          logCrashlytics({
            scope: 'SDK',
            fileName: 'CreditCard/CreditCard.tsx',
            sdk: 'I2C',
            error: `${log.errorCode} ${log.errorDescription}`,
            extraData: {
              networkStatus: isConnected ? 'active' : 'inactive',
              idTdc: cardReferences.idCard,
            },
          });
          analyticsManagerProvider.logEventWithType(
            {
              tipoZona: 'Perfil',
              zona: 'Inicio',
              subZona: 'InfoTarjeta',
              seccion: 'Error',
              tipoEvento: 'Click',
              tipoElemento: 'Carga',
              valor: 'Info. tarjeta',
            },
            AnalyticsProviderType.firebase,
            'virtualEventApp36',
          );
          if (!android) finishTask();
          setI2cErrorModal(true);
          setHasErrorI2C(true);
        }
      });

      i2cEvents.addListener('onLoading', () => {
        setOnLoadingStarted(true);
      });

      i2cEvents.addListener('onSuccess', () => {
        if (!onExistCurrentRevealCardInfo) {
          setOnExistRevealCardInfo(true);
          finishTaskTimeOut(timerToFinishTask);
        }
      });

      i2cEvents.addListener('onClosed', () => {
        setOnExistRevealCardInfo(false);
        setOnLoadingStarted(false);
      });
    }
    return () => {
      i2cEvents.removeAllListeners('onError');
      i2cEvents.removeAllListeners('onSuccess');
      i2cEvents.removeAllListeners('onClosed');
      i2cEvents.removeAllListeners('onLoading');
    };
  }, [setI2cErrorModal, onExistCurrentRevealCardInfo, isFocused]);

  const iconCardTrash = { height: '100%', width: '100%' };
  const bgStyles = [styles.backgroundStyle, isMultiCurrencyStatus ? { paddingBottom: 20 } : null];

  const handleI2cPress = () => {
    if (hasErrorI2C) {
      showToast({
        type: ToastType.TypeInfo,
        title: i18n.t('credit-card-home.title-toast-not-available'),
        message: i18n.t('credit-card-home.message-toast-card-error'),
      });
    } else if (!!credentialsI2C && isCardEnable) {
      analyticsManagerProvider.logEventWithType(
        {
          tipoZona: 'Perfil',
          zona: 'Inicio',
          subZona: 'InfoTarjeta',
          seccion: 'Éxito',
          tipoEvento: 'Click',
          tipoElemento: 'Botón',
          valor: 'Info. tarjeta',
        },
        AnalyticsProviderType.firebase,
        'virtualEventApp34',
      );
      revealCardInfo(cardReferences.authToken, cardReferences.cardRefNo);
    } else {
      showToast({
        type: ToastType.TypeInfo,
        title: i18n.t('credit-card-home.title-toast-not-available'),
        message: i18n.t('credit-card-home.message-toast-card-off'),
      });
    }
  };

  return (
    <Box overflow="hidden" style={styles.container} testID={testID}>
      {disabled || isCardDelinquentDisabled ? (
        <Box justifyContent="center" flex={1} alignItems="center">
          <Image style={iconCardTrash} source={CardTrashBg} />
        </Box>
      ) : (
        <>
          <Box position="absolute" top={0} bottom={0} left={0} right={0}>
            {isCardDelinquentIdle ? (
              <DigitalCardGray
                height="100%"
                width="100%"
                preserveAspectRatio="none"
                pointerEvents="none"
              />
            ) : (
              <DigitalCard
                height="100%"
                width="100%"
                preserveAspectRatio="none"
                pointerEvents="none"
              />
            )}

          </Box>
          <Box style={bgStyles}>
            <Box>
              <VisaLogo />
              <MtxDivider height={24 * rem} />

              <Box flexDirection="row" justifyContent="space-between" alignItems="center">
                <Text color="white" variant="body13pxRegular">
                  {i18n.t('credit-card-info-title')}
                </Text>
                {isLoading || isLoadingCards ? (
                  <EyeIconSkeleton isVisible />
                ) : (
                  <Box alignItems="center" justifyContent="space-between">
                    <TouchableOpacity
                      disabled={isInfoButtonDisabled}
                      onPress={handleI2cPress}
                    >
                      <CardInfo color="#fff" />
                    </TouchableOpacity>
                  </Box>
                )}
              </Box>
            </Box>

            {(!isLoading || !isLoadingCards) && errorServiceBalance ? null : (
              <ConsumedCard
                balanceLoading={balanceLoading}
                consumed={consumed}
                isMultiCurrency={isMultiCurrencyStatus}
                showBalance={showBalance}
              />
            )}

            <ConfirmModal
              type="warning"
              title={i18n.t('i2cModalError.title')}
              description={i18n.t('i2cModalError.description')}
              isVisible={i2cErrorModal}
              confirmButton={{
                label: i18n.t('understood'),
                onPress: () => setI2cErrorModal(false),
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

CreditCard.defaultProps = {
  isInfoButtonDisabled: false,
  testID: 'MtxCreditCard',
  disabled: false,
};

export default CreditCard;
