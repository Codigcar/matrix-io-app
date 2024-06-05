import { NavigationPropsType } from 'src/types/types';
import { Linking } from 'react-native';
import { useRef, useState } from 'react';
import { LINK_PRIVACY_POLICIES } from 'src/utils/constants';
import ReCaptchaV3 from 'src/components/ReCaptchaV3';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import UseCheckNetworkConnection from 'src/utils/hooks/UseCheckNetworkConnection';
import SupportServices from '../services/supportService';

const useSupport = (props: NavigationPropsType) => {
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [result, setResult] = useState(false);
  const [statusButton, setStatusButton] = useState(true);
  const reCaptchaRef = useRef<ReCaptchaV3>(null);
  const IsNetworkConnected = UseCheckNetworkConnection();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { navigation } = props;

  const onPressContinue = async (datos: any) => {
    if (!IsNetworkConnected) {
      navigation.navigate(navigationScreenNames.networkError);
      return;
    }
    try {
      setStatusButton(false);
      const { data } = await SupportServices.createTicketSupport(recaptchaToken, datos);
      if (data) {
        setStatusButton(true);
        if (data.created) {
          setResult(true);
        } else {
          setIsModalOpen(true);
        }
      }
    } catch (error) {
      if (reCaptchaRef.current) reCaptchaRef.current.refreshToken();
      setResult(false);
    }
  };

  const onPressBackArrow = () => navigation.goBack();

  const onPrivacyPress = () => {
    Linking.openURL(LINK_PRIVACY_POLICIES);
  };

  const onReceiveReCaptchaToken = (token: string) => setRecaptchaToken(token);

  const closeModal = () => {
    setIsModalOpen(false);
    navigation.goBack();
  };

  return {
    reCaptchaRef,
    onPressContinue,
    onPressBackArrow,
    onPrivacyPress,
    onReceiveReCaptchaToken,
    result,
    statusButton,
    isModalOpen,
    closeModal,
  };
};

export default useSupport;
