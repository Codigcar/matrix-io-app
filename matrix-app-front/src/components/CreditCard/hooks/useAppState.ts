import { useEffect, useRef, useState } from 'react';
import { AppState, NativeModules } from 'react-native';
import { ios } from 'src/utils/constants';

const { CoverViewManager } = NativeModules;

type Props = {
  statusRevealCardInfo: boolean;
};

const useAppState = ({ statusRevealCardInfo }: Props) => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (ios) {
        if (
          statusRevealCardInfo
          && appState.current === 'active'
          && nextAppState.match(/inactive|background/)
        ) {
          CoverViewManager.showCoverView();
        } else {
          CoverViewManager.hideCoverView();
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [statusRevealCardInfo]);

  return {
    appStateVisible,
  };
};

export default useAppState;
