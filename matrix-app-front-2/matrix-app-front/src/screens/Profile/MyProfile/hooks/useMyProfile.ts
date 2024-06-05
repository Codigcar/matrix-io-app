import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
// Utils
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';
// Actions
import { logout } from 'src/utils/auth/states/signInStates';
import { SendVerifyEmailCode, SignOut, UpdatePhoneNumber } from 'src/api/AuthServices';
import { logCrashlytics } from 'src/utils/Analytics';
import { setUserProfileData, setLoading } from 'src/store/states/sessionStates';
import getProfileData from 'src/api/ProfileServices';
import { getValue } from 'src/utils/AsyncStorageHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { i18n } from 'src/utils/core/MTXStrings';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import useOnboarding from 'src/screens/Welcome/Welcome/hooks/useWelcome';
import { useRemoteConfigGetValue } from 'src/shared/providers/remote-config/provider';
import { useNotifications } from 'src/screens/Home/Main/hooks/useNotifications';
import VerifyPush, { Flows } from 'src/components/VerifyPush/VerifyPush';
import { formatUserFullName } from 'src/utils/string';

const userSelector = (state: any) => state.session.user;
const isLoadingSessionSelector = (state: any) => state.session.isLoading;
const accountState = (state: any) => state.session.accountState;

export const useMyProfile = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const isActiveUpdateDataUser: boolean = useRemoteConfigGetValue('isActiveUpdateDataUser').value?.asBoolean();

  const accountCanceled = useSelector(accountState) !== 'AVAILABLE';
  const { isChangedValue, message, isFinishedDataUpdate } = params;
  const dispatch = useDispatch();
  const {
    alias, documentNumber, fullName, phoneNumber, address, email, isEmailVerified, name, lastName,
  } = useSelector(userSelector);
  const isLoadingSession = useSelector(isLoadingSessionSelector);

  const { requestNotification, updateToken, openSettings } = useNotifications();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingIndicator, setIsLoadingIndicator] = useState<boolean>(false);
  const { handleLoginPress } = useOnboarding();
  const [isNotificationModalVisible, setIsNotificationModalVisible] = useState<boolean>(false);
  const TIMEOUT_WAIT_FINISH_DATA_UPDATE = 3000;

  useEffect(() => {
    requestNotification(updateToken);
  }, []);

  useEffect(() => {
    if (isChangedValue && message) {
      showToast({ type: ToastType.Success, title: message });
    }
  }, [isChangedValue, message]);

  useEffect(() => {
    setIsLoadingIndicator(isLoadingSession);
  }, [isLoadingSession]);

  const getUserData = async () => {
    setIsLoading(true);
    try {
      const response = await getProfileData();
      dispatch(setUserProfileData(response));
    } catch (error) {
      navigation.navigate(navigationScreenNames.genericError);
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

  useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(useCallback(() => {
    if (isFinishedDataUpdate) {
      dispatch(setLoading(true));
      setTimeout(async () => {
        try {
          await getUserData();
          dispatch(setLoading(false));
          showToast({
            type: ToastType.TypeInfo,
            title: i18n.t('verifyOTP.update-data-in-progress-msg-1'),
            message: i18n.t('verifyOTP.update-data-in-progress-msg-2'),
          });
        } catch (e) {
          dispatch(setLoading(false));
        }
      }, TIMEOUT_WAIT_FINISH_DATA_UPDATE);
    }
  }, [isFinishedDataUpdate]));

  // Navigation

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const handlerVerifyEmail = async () => {
    try {
      await SendVerifyEmailCode();
      navigation.navigate('VerifyEmail', { stack: 'VerifyEmail', destination: email });
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'src/screens/Profile/MyProfile/hooks/useMyProfile.tsx',
        service: 'getOTPToVerifyEmail',
        error,
      });
      if (error.code === amplifyErrorCodes.exceededRequestOTP) {
        navigation.navigate('VerifyEmail', {
          stack: 'VerifyEmail',
          destination: email,
          isBlocked: true,
        });
      } else {
        showToast({
          type: ToastType.TypeDanger,
          title: i18n.t('verifyOTP.get-otp-error-title'),
          message: i18n.t('verifyOTP.get-otp-error-message'),
        });
      }
    }
  };

  const goTo = async (key: string): Promise<void> => {
    setIsLoadingIndicator(true);
    setTimeout(async () => {
      const deviceToken = await getValue('deviceToken');
      if (!deviceToken) {
        requestNotification(updateToken);
        setIsLoadingIndicator(false);
        setIsNotificationModalVisible(true);
        return;
      }
      const verifyPushModule = new VerifyPush(deviceToken);
      await verifyPushModule.createFactor(Flows.UPDATE_ATTRIBUTES);
      setIsLoadingIndicator(false);
      switch (key) {
        case 'EmailVerify':
          await handlerVerifyEmail();
          break;
        case 'Email':
          navigation.navigate('EmailStack', {
            screen: 'NewEmail',
          });
          break;
        case 'Phone':
          navigation.navigate('Phone', {
            screen: 'NewPhone',
          });
          break;
        case 'Address':
          navigation.navigate('Address');
          break;
        default:
          navigation.navigate('Alias');
          break;
      }
    }, 2000);
  };

  const signOut = async () => {
    await handleLoginPress();
    SignOut();
    dispatch(logout());
  };

  const getCancellationRequest = async () => {
    navigation.navigate('CancelAccountStack');
  };

  const closeNotificationModal = () => setIsNotificationModalVisible(false);
  const handleNotificationModalButtonPress = () => {
    closeNotificationModal();
    console.log('GO SETTINGS');
    openSettings();
  };

  return {
    onPressBackArrow,
    useName: formatUserFullName(name, lastName),
    alias,
    fullName,
    phoneNumber,
    address,
    email,
    documentNumber,
    maskData,
    signOut,
    goTo,
    isEmailVerified,
    isLoading,
    isLoadingIndicator,
    getCancellationRequest,
    message,
    accountCanceled,
    isNotificationModalVisible,
    closeNotificationModal,
    handleNotificationModalButtonPress,
    getUserData,
    isActiveUpdateDataUser,
  };
};

export default useMyProfile;
