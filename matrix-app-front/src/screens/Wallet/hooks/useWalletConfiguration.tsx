import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { consumerID, cardId } from 'libs/constants/configuration';
import {
  THALES_D1_SERVICE_URL_STRING,
  THALES_ISSUER_ID,
  THALES_PUBLIC_KEY_EXPONENT,
  THALES_PUBLIC_KEY_MODULUS,
  THALES_DIGITAL_CARD_URL_STRING,
  android,
} from 'src/utils/constants';
import { useRemoteConfigGetValue } from 'src/shared/providers/remote-config';
import { logCrashlytics } from 'src/utils/Analytics';
import WalletConfigureServices from 'src/api/WalletServices';
import { getValue } from 'src/utils/AsyncStorageHandler';
import useNotifications from 'src/screens/Home/Main/hooks/useNotifications';
import VerifyPush, { Flows } from 'src/components/VerifyPush/VerifyPush';
import { useChallenge } from 'src/components/Challenge';

import {
  isWalletInstalled,
  login,
  configure,
  getDigitizationState,
  digitizeCard,
  DIGITALIZATION_STATE,
  GOOGLE_WALLET_URL,
} from 'matrix-thales-d1';

const useWalletConfiguration = () => {
  const cardsStore = useSelector((state: any) => state.cards?.cards);
  const initialD1State = {
    loading: false,
    error: null,
    response: null,
  };
  const [d1State, setD1State] = useState<{
    loading: boolean;
    error?: any;
    response?: boolean | null;
  }>(initialD1State);

  const { requestNotification, updateToken } = useNotifications();
  const { waitForChallenge } = useChallenge();
  const isWalletActive: boolean | undefined =
    useRemoteConfigGetValue('isWalletActive').value?.asBoolean();
  const [walletToken, setWalletToken] = useState<string>('');
  const [walletCardId, setWalletCardId] = useState<string>('');

  const addToWallet = async (_cardId: string) => {
    try {
      await digitizeCard(_cardId);
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'ThalesD1.digitizeCard',
        error,
        sdk: 'Thales',
      });
      setTimeout(() => setD1State({ loading: false, error }), 1000);
    }
  };

  const checkDigitizationState = async (_cardId: string) => {
    try {
      const statusDigitization = await getDigitizationState(_cardId);
      if (statusDigitization === DIGITALIZATION_STATE.NOT_DIGITIZED) {
        await addToWallet(cardId);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'ThalesD1.checkDigitizationStatus',
        error,
        sdk: 'Thales',
      });
      setTimeout(() => setD1State({ loading: false, error }), 1000);
    }
  };

  const loginThales = async (token: string): Promise<boolean> => {
    try {
      return await login(token);
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'ThalesD1.login',
        error,
        sdk: 'Thales',
      });
      setTimeout(() => setD1State({ loading: false, error }), 1000);
    }
    return false;
  };

  const initialization = async () => {
    try {
      const isLogin: boolean = await loginThales(walletToken);
      if (isLogin) {
        await checkDigitizationState(cardId);
      }
    } catch (error) {
      setTimeout(() => setD1State({ loading: false, error }), 1000);
    }
  };

  const getThalesToken = async (_walletCardId: string) => {
    try {
      const access = await WalletConfigureServices.getWalletSdkToken(_walletCardId);
      setWalletToken(access?.token);
      setD1State({ loading: false });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'WalletConfigureServices.getWalletSdkToken',
        error,
      });
    } finally {
      setD1State({ loading: false });
    }
  };

  const deviceConfiguration = async () => {
    setD1State({ loading: true });
    try {
      const configurated = await configure(
        THALES_D1_SERVICE_URL_STRING,
        THALES_ISSUER_ID,
        THALES_PUBLIC_KEY_EXPONENT,
        THALES_PUBLIC_KEY_MODULUS,
        THALES_DIGITAL_CARD_URL_STRING,
        consumerID,
      );
      if (configurated) {
        await initialization();
      }
    } catch (error) {
      logCrashlytics({
        scope: 'SDK',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'ThalesD1.configure',
        error,
        sdk: 'Thales',
      });
      setTimeout(() => setD1State({ loading: false, error }), 1000);
    }
  };

  const registerConsumerToThales = async (_cardsStore: any) => {
    setD1State({ loading: true });

    try {
      const objectCard = { card: `${_cardsStore[0].id}` };
      const dataConsumer = await WalletConfigureServices.registerConsumerWithCard(objectCard);
      const walletCardIdentification = dataConsumer?.id;
      setWalletCardId(walletCardIdentification);
      if (dataConsumer) {
        getThalesToken(walletCardIdentification);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'WalletConfigureServices.registerConsumerWithCard',
        error,
      });
    } finally {
      setD1State({ loading: false });
    }
  };

  const openGooglePlay = async () => {
    await Linking.openURL(GOOGLE_WALLET_URL);
  };

  const twilioAuthentication = async () => {
    const deviceToken = await getValue('deviceToken');
    if (!deviceToken) {
      requestNotification(updateToken);
      return;
    }
    const verifyPushModule = new VerifyPush(deviceToken);
    await verifyPushModule.createFactor(Flows.WALLET_FLOW);
    await waitForChallenge?.();
  };

  const isGWalletInstalled = async (): Promise<boolean> => {
    setD1State({ loading: true });
    try {
      const isInstalled: boolean = await isWalletInstalled();

      if (isInstalled) {
        await deviceConfiguration();
        return true;
      }
      setD1State({ loading: false, response: isInstalled });
    } catch (error) {
      setTimeout(() => setD1State({ loading: false, error }), 2000);
      logCrashlytics({
        scope: 'SDK',
        fileName: 'Wallet/hooks/useWalletConfiguration.tsx',
        service: 'ThalesD1.isWalletInstalled',
        error,
      });
    }
    setD1State({ loading: false });

    return false;
  };

  useEffect(() => {
    if (android) {
      registerConsumerToThales(cardsStore);
    }
  }, []);

  return {
    d1State,
    openGooglePlay,
    isGWalletInstalled,
    isWalletActive,
    twilioAuthentication,
  };
};

export default useWalletConfiguration;
