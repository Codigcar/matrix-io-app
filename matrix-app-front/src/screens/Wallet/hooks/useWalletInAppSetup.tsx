import { useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';
import { useDispatch } from 'react-redux';
import { setInAppData } from 'src/store/states/sessionStates';

const { InAppWalletModule } = NativeModules;

export const useWalletInAppSetup = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const inAppWalletEmitter = new NativeEventEmitter(InAppWalletModule);

    const subscription = inAppWalletEmitter.addListener('CARD_ACTIVATION', (eventData) => {
      console.log('Wallet Payload received!', eventData);
      dispatch(setInAppData(eventData));
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
