import { useCallback, useEffect, useState } from 'react';
import { AppState, BackHandler } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import { useNotifications } from 'src/screens/Home/Main/hooks/useNotifications';
import { getValue } from 'src/utils/AsyncStorageHandler';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import VerifyPush, { Flows } from 'src/components/VerifyPush/VerifyPush';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { onboardingSummary } from 'src/api/Onboarding';
import { pollCondition } from 'src/utils/polling';
import { onboardingStates } from 'src/utils/constants';

const MFA_REGISTERED_INTERVAL = 3000;
const MFA_REGISTERED_TIMEOUT = 30000;

const usePersonalDataComplete = (props: NavigationPropsType) => {
  const { navigation } = props;
  const { requestNotification, updateToken, openSettings } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState<boolean>(false);

  useEffect(() => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp26',
      seccion: 'Exito',
      tipoEvento: 'Visualizar',
      tipoElemento: 'Mensaje felicitaciones',
      valor: 'Felicidades',
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const requestNotificationUpdate = useCallback(() => {
    requestNotification(updateToken);
  }, [requestNotification, updateToken]);

  useEffect(() => {
    requestNotificationUpdate();
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        nextAppState === 'active'
      ) {
        requestNotificationUpdate();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [requestNotificationUpdate]);

  const handleContinuePressButton = async () => {
    try {
      setIsLoading(true);
      const deviceToken = await getValue('deviceToken');
      if (!deviceToken) {
        requestNotification(updateToken);
        setTimeout(() => {
          setIsNotificationModalVisible(true);
        }, 200);
        return;
      }
      const onboardingState = await onboardingSummary();
      const verifyPushModule = new VerifyPush(deviceToken);
      await verifyPushModule.createFactor(Flows.CONTRACT_OFFER_FLOW, onboardingState.status !== 'MFA_REGISTERED');
      await pollCondition(
        () => onboardingSummary(),
        ({ status }) => status === onboardingStates.mfaRegistered,
        MFA_REGISTERED_INTERVAL,
        MFA_REGISTERED_TIMEOUT,
      );
      navigation.navigate(navigationScreenNames.cardOfferStack);
    } catch (error) {
      showToast({
        type: ToastType.Error,
        title: i18n.t('verifyPush.error-toast-message'),
        visibilityTime: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const closeNotificationModal = () => setIsNotificationModalVisible(false);

  const handleNotificationModalButtonPress = () => {
    closeNotificationModal();
    openSettings();
  };

  const onBackPress = () => navigation.goBack();

  return {
    isLoading,
    isNotificationModalVisible,
    handleContinuePressButton,
    onBackPress,
    closeNotificationModal,
    handleNotificationModalButtonPress,
  };
};

export default usePersonalDataComplete;
