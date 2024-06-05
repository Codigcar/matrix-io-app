import React, { useContext } from 'react';
import { Box, Button, Modal, Text, fonts } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { useNavigation } from '@react-navigation/native';
import { SendVerifyEmailCode } from 'src/api/AuthServices';
import Danger from 'assets/svgs/danger.svg';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ModalContext } from 'src/store/states/modalsContext';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
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
        params: {
          stack: 'VerifyEmail',
          destination: emailMasked,
          origin: navigationScreenNames.home,
        },
      });
    } catch (error) {
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
      <Box
        testID="VERIFY_EMAIL_MODAL"
        justifyContent="center"
        flex={1}
        backgroundColor="modalWithOpacity"
        paddingHorizontal="spacing-m"
      >
        <Box
          backgroundColor="white"
          paddingHorizontal="spacing-m"
          paddingVertical="spacing-s"
          borderRadius={16}
        >
          <Text
            variant="SubTitle"
            fontFamily={fonts.euclidCircularBold}
            color="primaryDarkest"
            textAlign="center"
          >
            {i18n.t('verify-email.modal.title')}
          </Text>
          <Box
            padding="spacing-s"
            backgroundColor="backgroundLabelOpacity"
            my="spacing-s"
            borderRadius={8}
          >
            <Box flexDirection="row" alignItems="center" justifyContent="center">
              <Danger />
              <Text
                variant="label"
                fontFamily={fonts.euclidCircularRegular}
                color="primaryDarkest"
                marginLeft="spacing-xxxs"
              >
                {i18n.t('verify-email.modal.label')}
              </Text>
            </Box>
            <Text
              variant="label"
              fontFamily={fonts.euclidCircularSemibold}
              color="primaryDarkest"
              mt="spacing-xxxs"
              textAlign="center"
              numberOfLines={1}
            >
              {emailMasked}
            </Text>
          </Box>
          <Button
            label={i18n.t('verify-email.modal.submit-text')}
            variant="primary"
            onPress={goToVerifyEmail}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default VerifyEmailModal;
