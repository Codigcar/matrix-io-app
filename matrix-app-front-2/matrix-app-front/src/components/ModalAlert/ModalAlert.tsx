import React from 'react';
import Icon from 'libs/ui-toolkit/components/mtx-icon/MtxIcon';
import {
  Box, Text, fonts, Button, Modal,
} from 'matrix-ui-components';
import { CheckWarning } from 'assets/svgs/index';
import { RFValue } from 'react-native-responsive-fontsize';

type ModalAlertPropTypes = {
  isVisible: boolean;
  icon: string;
  title: string;
  message: string;
  buttonText: string;
  close: () => void;
  rebranding?: boolean;
  brandEnd?: string;
};

const ModalAlert = ({
  isVisible,
  title,
  message,
  buttonText,
  icon,
  close,
  rebranding,
  brandEnd,
}: ModalAlertPropTypes) => (
  <Modal animationType="fade" transparent visible={isVisible} onRequestClose={close}>
    <Box
      flex={1}
      justifyContent="center"
      paddingHorizontal="spacing-m"
      backgroundColor={rebranding ? 'blackWithOpacity' : 'modalWithOpacity'}
    >
      <Box
        alignItems="center"
        paddingHorizontal="spacing-m"
        backgroundColor="white"
        borderRadius={RFValue(24)}
        opacity={1}
      >
        {rebranding ? (
          <>
            <Box alignItems="center" mt="spacing-xm">
              <CheckWarning width={68} height={68} />
            </Box>
            <Text variant="Heading18Medium" textAlign="center" mt="spacing-m">
              {title}
            </Text>
            <Text variant="body14pxRegular" textAlign="center" mt="spacing-m">
              {message}
              {brandEnd && (
                <Text variant="body14pxRegular" fontFamily={fonts.euclidCircularSemibold}>
                  {brandEnd}
                </Text>
              )}
            </Text>
          </>
        ) : (
          <>
            <Box alignItems="center" mt="spacing-m">
              <Icon size="large" name={icon} />
            </Box>
            <Text
              variant="SubTitle"
              textAlign="center"
              mt="spacing-m"
              fontFamily={fonts.euclidCircularSemibold}
            >
              {title}
            </Text>
            <Text
              variant="label"
              textAlign="center"
              mt="spacing-m"
              fontFamily={fonts.euclidCircularRegular}
            >
              {message}
            </Text>
          </>
        )}
        <Button
          width="100%"
          variant="primary"
          label={buttonText}
          onPress={close}
          disabled={false}
          my="spacing-m"
        />
      </Box>
    </Box>
  </Modal>
);

ModalAlert.defaultProps = {
  rebranding: false,
  brandEnd: '',
};

export default ModalAlert;
