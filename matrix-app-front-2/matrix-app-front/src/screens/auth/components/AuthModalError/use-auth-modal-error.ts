import { useContext, useState } from 'react';
import { ModalContext } from 'src/store/states/modalsContext';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useNavigation } from '@react-navigation/native';
import { ReCaptchaErrorsEnum, ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';
import { setReCaptchaSessionToken } from 'src/store/states/sessionStates';
import { useDispatch } from 'react-redux';
import { AuthRoutesEnum } from 'src/shared/enums/routes/auth-routes.enum';

/**
 * Custom hook to handle ReCaptcha modal errors.
 *
 * This hook provides functions to show and close ReCaptcha modal errors.
 *
 * @returns {Object} An object containing functions and values related to ReCaptcha modal errors.
 */
const useAuthModalError = () => {
  const {
    authErrorModal,
    updateAuthErrorModal,
    typeAuthErrorModal,
    updateTypeAuthErrorModal,
    screenCurrentModal,
    updateScreenCurrentModal,
  } = useContext(ModalContext);

  // Error messages based on error codes
  const errorObject: any = {
    securityRisk: {
      title: 'session-error.score.title',
      message: 'session-error.score.message',
    },
    sessionExpired: {
      title: 'session-error.sessionExpired.title',
      message: 'session-error.sessionExpired.message',
    },
    attemptsExceeded: {
      title: 'session-error.attemptsExceeded.title',
      message: 'session-error.attemptsExceeded.message',
    },
    unexpectedError: {
      title: 'session-error.server.title',
      message: 'session-error.server.message',
    },
    unknownError: {
      title: 'session-error.server.title',
      message: 'session-error.server.message',
    },
  };

  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const [isCloseModal, setIsClonseModal] = useState<boolean>(false);

  /**
   * Shows the ReCaptcha modal error based on the provided error code.
   *
   * @param {string} errorCode - The error code to display the modal for.
   */
  const showModalError = (errorCode: string, screen?: string, isCloseDefault: boolean = false) => {
    setIsClonseModal(isCloseDefault);
    updateTypeAuthErrorModal(errorCode);
    if (screen) {
      updateScreenCurrentModal(screen);
    }
    updateAuthErrorModal(true);
  };

  /**
   * Closes the ReCaptcha modal error and takes action based on the error code.
   */
  const closeModalError = () => {
    if (isCloseModal) {
      updateAuthErrorModal(false);
    } else {
      const notIsSessionApiError = typeAuthErrorModal !== ReCaptchaErrorsEnum.SECURITY_RISK
        && typeAuthErrorModal !== ReCaptchaErrorsEnum.UNKNOWN_ERROR;

      // Dispatch to set ReCaptcha session token to null if it's not a session API error
      if (notIsSessionApiError) {
        dispatch(setReCaptchaSessionToken(null));
      }

      switch (screenCurrentModal) {
        case ScreenCurrentEnum.AUTO_SIGN_IN:
          resetNavigation(navigation, AuthRoutesEnum.AUTH_STACK);
          break;
        case ScreenCurrentEnum.PASSWORD_RECOVERY:
          resetNavigation(navigation, AuthRoutesEnum.PASSWORD_RECOVERY_STACK);
          break;
        default:
          break;
      }

      // Close the ReCaptcha modal error
      updateAuthErrorModal(false);
    }
  };

  return {
    authErrorModal,
    closeModalError,
    showModalError,
    errorObject,
    typeAuthErrorModal,
    screenCurrentModal,
  };
};

export default useAuthModalError;
