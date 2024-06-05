import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from 'src/navigators/RootNavigation';
import navigationScreenNames from 'src/utils/navigationScreenNames';

export const useInAppWalletRedirect = () => {
  const inAppData = useSelector((state) => state.session.inAppData);

  useEffect(() => {
    if (inAppData) {
      navigate(navigationScreenNames.settingsStack, {
        screen: navigationScreenNames.inAppValidation,
      });
    }
  }, [inAppData]);
};
