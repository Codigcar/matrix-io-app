import React, { useContext } from 'react';
import {
  Box, Button, Modal, Text,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { useNavigation } from '@react-navigation/native';
import { SendVerifyEmailCode } from 'src/api/AuthServices';
import Danger from 'assets/svgs/danger.svg';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ModalContext } from 'src/shared/contexts';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import { BackgroundTransparent } from 'src/components/Backgrounds/BackgroundTransparent';
import { ios } from 'src/utils/constants';
import useVerifyEmailModal from './hooks/useVerifyEmailModal';

interface ModalProps {
  onClose: () => void;
}

const VerifyEmailModal = ({ onClose }: ModalProps) => {
  const { verifyEmailModal: showVerifyEmailModal } = useContext(ModalContext);
  const { emailMasked } = useVerifyEmailModal();
  const navigation = useNavigation();
  const goToVerifyEmail = async () => {
    try {
      await SendVerifyEmailCode();
      onClose();
      navigation.navigate('ProfileStack', {
        screen: 'VerifyEmail',
        params: { stack: 'VerifyEmail', destination: emailMasked, origin: navigationScreenNames.home },
      });
    } catch (error: any) {
      onClose();
      if (error.code === amplifyErrorCodes.exceededRequestOTP) {
        navigation.navigate('ProfileStack', {
          screen: 'VerifyEmail',
          params: {
            stack: 'VerifyEmail',
            destination: emailMasked,
            origin: navigationScreenNames.home,
            isBlocked: true,
          },
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

  return (
    <Modal
      animationType="slide"
      transparent
      visible={showVerifyEmailModal}
      onRequestClose={onClose}
    >
      <BackgroundTransparent />
      <Box
        testID="VERIFY_EMAIL_MODAL"
        justifyContent="center"
        flex={1}
        backgroundColor="transparent"
        paddingHorizontal="spacing-m"
      >
        <Box
          backgroundColor="white"
          padding="spacing-m"
          alignItems="center"
          borderRadius={24}
        >
          <Text
            variant="Heading18pxMedium"
            textAlign="center"
            fontWeight="500"
            marginVertical="spacing-xxs"
          >
            {i18n.t('profile:verify-email.modal.title')}
          </Text>
          <Box maxWidth={280}>
            <Text
              variant={ios ? 'body13pxRegular' : 'body14pxRegular'}
              color="primary800"
              textAlign="center"
            >
              {i18n.t('profile:verify-email.modal.body')}
            </Text>
          </Box>
          <Box
            padding="spacing-s"
            backgroundColor="complementaryIndigo050"
            my="spacing-m"
            flexDirection="row"
            borderRadius={16}
          >
            <Box
              backgroundColor="white"
              height={40}
              width={40}
              borderRadius={8}
              alignItems="center"
              justifyContent="center"
              marginRight="spacing-s"
            >
              <Danger />
            </Box>
            <Box
              flex={1}
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="flex-start"
            >
              <Text
                variant={ios ? 'body12pxMedium' : 'body14pxMedium'}
                textAlign="left"
                fontWeight="500"
                numberOfLines={1}
              >
                {i18n.t('profile:verify-email.modal.label')}
              </Text>
              <Box width="100%">
                <Text
                  variant={ios ? 'body12pxRegular' : 'body13pxRegular'}
                  color="primary800"
                  textAlign="left"
                  fontWeight="400"
                  numberOfLines={1}
                >
                  {emailMasked}
                </Text>
              </Box>
            </Box>
          </Box>
          <Button
            label={i18n.t('profile:verify-email.modal.submit-text')}
            variant="primary"
            width="100%"
            onPress={goToVerifyEmail}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyEmailModal;
