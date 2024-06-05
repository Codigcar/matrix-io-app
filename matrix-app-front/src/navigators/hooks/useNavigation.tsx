import { useDispatch, useSelector } from 'react-redux';
import { logout as Logout } from 'src/utils/auth/states/signInStates';
import { SignOut } from 'src/api/AuthServices';
import { NavigationRefType } from 'src/utils/types';
import { ModalContext } from 'src/shared/contexts';
import { useContext } from 'react';
import {
  resetGiftHasBeenSeen,
  turnOffCashbackModal,
  resetEmptyGift,
} from 'src/screens/Welcome/states/welcomeState';
import useWelcome from 'src/screens/Welcome/Welcome/hooks/useWelcome';

const welcomeSelector = (state: any) => state.welcome;
const useOnboarding = () => {
  const welcomeData = useSelector(welcomeSelector);
  const { sliderHasBeenSeen } = welcomeData;
  const dispatch = useDispatch();
  const {
    updateVerifyEmailModal,
    updateMysteryBoxModal,
    updateFraudBlockModal,
    updateAuthErrorModal,
  } = useContext(ModalContext);
  const { handleLoginPress } = useWelcome();

  const logout = (navigationRef: NavigationRefType) => {
    SignOut();
    dispatch(Logout());

    /* Resetear estos valores al cerrar sesion */
    updateVerifyEmailModal(false);
    updateMysteryBoxModal(false);
    updateFraudBlockModal(false);
    updateAuthErrorModal(false);
    dispatch(resetGiftHasBeenSeen());
    dispatch(turnOffCashbackModal());
    dispatch(resetEmptyGift());

    if (navigationRef) {
      handleLoginPress();
    }
  };

  return {
    sliderHasBeenSeen,
    logout,
  };
};

export default useOnboarding;
