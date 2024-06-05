import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { saveValue } from 'src/utils/AsyncStorageHandler';
import { i18n } from 'src/utils/core/MTXStrings';
import { SignOut } from 'src/api/AuthServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { logout } from 'src/utils/auth/states/signInStates';
import { setUserProfileData } from 'src/store/states/sessionStates';
import getProfileData from 'src/api/ProfileServices';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ModalContext } from 'src/store/states/modalsContext';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import { DelinquentContext } from 'src/store/states/delinquentContext';
import useDeliquentValues from '../../components/hooks/useDelinquentValues';

const isEmailVerifiedSelector = (state: any) => state.session.user?.isEmailVerified;
const giftHasBeenSeenSelector = (state: any) => state.welcome.giftHasBeenSeen;
const emptyGiftSelector = (state: any) => state.welcome.emptyGift;
const accountState = (state: any) => state.session.accountState;

const useHome = (props: NavigationPropsType) => {
  const { navigation } = props;
  const isEmailVerified = useSelector(isEmailVerifiedSelector);
  const giftHasBeenSeen = useSelector(giftHasBeenSeenSelector);
  const emptyGift = useSelector(emptyGiftSelector);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const accountCanceled = useSelector(accountState) !== 'AVAILABLE';
  const dispatch = useDispatch();
  const { updateVerifyEmailModal } = useContext(ModalContext);
  const { alert } = useContext(DelinquentContext);
  const { handleLoginPress } = useOnboarding();
  const { setToastMessage } = useDeliquentValues();

  const goToLogout = () => {
    navigation.navigate(navigationScreenNames.genericError, {
      logout: true,
      title: i18n.t('UserNotFoundError.title'),
      subtitle: i18n.t('UserNotFoundError.subtitle'),
      buttonLabel: i18n.t('UserNotFoundError.button'),
    });
  };

  const WAIT_VERIFY_EMAIL_MODAL_ONE_SECOND = 1000;
  const closeVerifyModal = () => updateVerifyEmailModal(false);

  useEffect(() => {
    const TimeCheckGift: NodeJS.Timeout = setTimeout(() => {
      if (giftHasBeenSeen || emptyGift) updateVerifyEmailModal(!isEmailVerified);
    }, WAIT_VERIFY_EMAIL_MODAL_ONE_SECOND);
    return () => {
      clearTimeout(TimeCheckGift);
    };
  }, [giftHasBeenSeen, emptyGift, isEmailVerified]);

  useEffect(() => {
    setToastMessage(alert);
  }, [alert]);

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const response = await getProfileData();
        dispatch(setUserProfileData(response));
      } catch (error: any) {
        if (error.response?.data) {
          if (error.response.data.includes('no_user_was_found')) goToLogout();
        } else {
          navigation.navigate(navigationScreenNames.genericError);
        }
        logCrashlytics({
          scope: 'API',
          fileName: 'src/screens/Profile/MyProfile/hooks/useMyProfile.tsx',
          service: 'getProfileData',
          error,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);

  const goToOk = async (type: string) => {
    await saveValue('counterModalBiometric', 4);
    navigation.navigate('BiometricNavigation', {
      screen: 'ResponseOk',
      params: { type },
    });
  };

  const goToFalse = (type: string) => {
    navigation.navigate('BiometricNavigation', {
      screen: 'ResponseFail',
      params: { type },
    });
  };

  const goToWelcome = () => {
    handleLoginPress();
  };

  const signOut = () => {
    goToWelcome();
    dispatch(logout());
    SignOut();
  };

  return {
    isLoading,
    closeVerifyModal,
    signOut,
    giftHasBeenSeen,
    accountCanceled,
  };
};

export default useHome;