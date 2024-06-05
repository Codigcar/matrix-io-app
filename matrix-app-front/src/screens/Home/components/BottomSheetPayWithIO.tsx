import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Button, Modal, GooglePayButton, ApplePayButton } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationType } from 'src/types/types';
import { saveValue, getValue } from 'src/utils/AsyncStorageHandler';
import { PayIoIOS, PayIoPredetermined, ApplePayBordered, GooglePay } from 'assets/svgs';
import { android, ios } from 'src/utils/constants';
import { ModalContext } from 'src/shared/contexts/modal/modals.context';

interface IBottomSheetPayWithIOProps {
  navigation: NavigationType;
}

const BottomSheetPayWithIO: React.FC<IBottomSheetPayWithIOProps> = (props) => {
  const [show, setShow] = useState(false);
  const { verifyEmailModal } = useContext(ModalContext);

  useEffect(() => {
    getValue('showIncentiveBottom').then((value) => {
      if (value || verifyEmailModal) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  }, []);

  if (!show) return null;

  const onClose = async () => {
    await saveValue('showIncentiveBottom', true);
    setShow(false);
  };

  const navigateToSettings = async () => {
    const { navigation } = props;
    onClose();
    navigation.navigate('SettingsStack', {
      screen: 'CardConfigure',
    });
  };

  const renderItem = (image: React.ReactNode, title: string, label: string) => (
    <Box flexDirection="row" alignItems="flex-start">
      <Box justifyContent="center" alignItems="center" mr="spacing-s">
        {image}
      </Box>
      <Box justifyContent="center" alignItems="flex-start" flex={1}>
        <Text variant="body14SemiBold" mb="spacing-xxxs">
          {title}
        </Text>
        <Text variant="body12pxRegular">{label}</Text>
      </Box>
    </Box>
  );

  return android ? (
    <Modal animationType="slide" transparent visible={show} onRequestClose={onClose}>
      <Box flex={1} backgroundColor="modalWithOpacity" justifyContent="center" p="spacing-m">
        <Box p="spacing-sm" pb="spacing-m" backgroundColor="white" borderRadius={24}>
          <Box justifyContent="center">
            <Box justifyContent="center" alignItems="center" mt="spacing-xxs" mb="spacing-m">
              {ios ? <ApplePayBordered /> : <GooglePay />}
            </Box>
            <Box justifyContent="center" mb="spacing-sm" alignItems="center">
              <Box maxWidth={ios ? 280 : 263}>
                <Text
                  textAlign="center"
                  variant="Heading24Medium"
                  mb={!ios ? 'spacing-m' : undefined}
                >
                  {i18n.t(
                    ios
                      ? 'wallet:wallet-flow.pay-with-io-apple-pay-title'
                      : 'wallet:wallet-flow.pay-with-io-google-pay-title',
                  )}
                </Text>
                {!ios && (
                  <Text textAlign="center" variant="body14pxRegular">
                    {i18n.t('wallet:wallet-flow.pay-with-io-google-pay-subtitle')}
                  </Text>
                )}
              </Box>
            </Box>
            {ios && (
              <Box mb="spacing-sm">
                {renderItem(
                  <PayIoIOS />,
                  i18n.t('wallet:wallet-flow.pay-with-io-apple-pay-info-first-title'),
                  i18n.t('wallet:wallet-flow.pay-with-io-apple-pay-info-first'),
                )}
                {renderItem(
                  <PayIoPredetermined />,
                  i18n.t('wallet:wallet-flow.pay-with-io-apple-pay-info-second-title'),
                  i18n.t('wallet:wallet-flow.pay-with-io-apple-pay-info-second'),
                )}
              </Box>
            )}
            {ios ? (
              <ApplePayButton mb="spacing-xxxs" onPress={navigateToSettings} />
            ) : (
              <GooglePayButton m="spacing-xxxs" onPress={navigateToSettings} />
            )}
            <Button
              variant="secondary"
              onPress={onClose}
              label={i18n.t('wallet:wallet-flow.pay-with-io-omit-button-label')}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  ) : null;
};

export default BottomSheetPayWithIO;
