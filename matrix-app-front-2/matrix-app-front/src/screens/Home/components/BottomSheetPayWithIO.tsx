import React, { useEffect, useState } from 'react';
import {
  Platform, Pressable, View,
} from 'react-native';
import {
  Box, Text, fonts, Button, Divider,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { saveValue, getValue } from 'src/utils/AsyncStorageHandler';
import Close from 'assets/icons/svgs/close';
import PayIoIOS from 'assets/svgs/pay_io_ios.svg';
import PayNFC from 'assets/svgs/pay_with_nfc_io.svg';
import PayIoPredetermined from 'assets/svgs/pay_io_predetermined.svg';
import ApplePay from 'assets/svgs/apple_pay.svg';
import Apple from 'assets/svgs/apple_white.svg';
import styles from './styles/BottomSheetPayWithIOStyle';

interface IBottomSheetPayWithIOProps {
  props: NavigationPropsType;
}

const BottomSheetPayWithIO: React.FC<IBottomSheetPayWithIOProps> = ({ props }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    getValue('showIncentiveBottom').then((value) => {
      if (value) {
        setShow(false);
      } else {
        setShow(true);
      }
    });
  }, []);

  const onClose = async () => {
    await saveValue('showIncentiveBottom', true);
    setShow(false);
  };

  const navigateToSettings = async () => {
    const { navigation } = props;
    onClose();
    if (Platform.OS === 'android') {
      navigation.navigate('SettingsStack', {
        screen: 'PayWithNFC',
      });
    } else {
      // TODO: implement redirect with SDK Thales
    }
  };

  const contentAndroid = () => (
    <Box>
      <Box justifyContent="center" alignItems="center">
        <PayNFC />
      </Box>
      <Box
        mr="spacing-m"
        ml="spacing-m"
        justifyContent="center"
        alignItems="center"
        mt="spacing-s"
        mb="spacing-s"
      >
        <Text
          textAlign="center"
          variant="H3"
          fontFamily={fonts.euclidCircularBold}
          numberOfLines={2}
        >
          {i18n.t('wallet-flow.pay-with-io-title-android')}
        </Text>
        <Text
          textAlign="center"
          variant="label"
          mt="spacing-xs"
          fontFamily={fonts.euclidCircularRegular}
          numberOfLines={3}
        >
          {i18n.t('wallet-flow.pay-with-io-subtitle-android')}
        </Text>
      </Box>
      <Button
        variant="primary"
        m="spacing-xxxs"
        onPress={navigateToSettings}
        label={i18n.t('wallet-flow.pay-with-io-button-label')}
      />
      <Text
        textAlign="center"
        variant="label"
        mt="spacing-s"
        marginHorizontal="spacing-s"
        fontFamily={fonts.euclidCircularRegular}
        numberOfLines={3}
      >
        {i18n.t('wallet-flow.pay-with-io-info')}
        <Text variant="label" fontFamily={fonts.euclidCircularSemibold}>
          {`${'"'}`.concat(i18n.t('wallet-flow.pay-with-io-configuration')).concat('"')}
        </Text>
      </Text>
    </Box>
  );

  const itemRow = (image: any, text: string) => (
    <>
      <Box flexDirection="row">
        <Box width="25%" justifyContent="center" alignItems="center" mt="spacing-xxxxs">
          {image}
        </Box>
        <Box width="75%" justifyContent="center" alignItems="flex-start">
          <Text
            variant="label"
            mt="spacing-s"
            marginHorizontal="spacing-s"
            fontFamily={fonts.euclidCircularLight}
          >
            {text}
          </Text>
        </Box>
      </Box>
      <Divider height={30} />
    </>
  );

  const contentiOS = () => (
    <Box>
      <Box
        mr="spacing-m"
        ml="spacing-m"
        justifyContent="center"
        alignItems="center"
        mt="spacing-s"
        mb="spacing-s"
      >
        <Text textAlign="center" variant="H3" fontFamily={fonts.euclidCircularBold}>
          {i18n.t('wallet-flow.pay-with-io-title-ios')}
        </Text>
      </Box>
      {itemRow(<PayIoIOS />, i18n.t('wallet-flow.pay-with-io-info-first'))}
      <View style={styles.separator} />
      {itemRow(<PayIoPredetermined />, i18n.t('wallet-flow.pay-with-io-info-second'))}
      <Pressable onPress={navigateToSettings}>
        <Box mb="spacing-m" borderRadius={8} p="spacing-xs" style={styles.buttonApple}>
          <Text
            color="white"
            textAlign="center"
            variant="SubTitle"
            fontFamily={fonts.euclidCircularBold}
          >
            {i18n.t('wallet-flow.pay-with-io-button-label-ios')}
            <Box pt="spacing-xxs" mt="spacing-s">
              <Apple />
            </Box>
            {i18n.t('wallet-flow.pay')}
          </Text>
        </Box>
      </Pressable>
    </Box>
  );

  if (!show) return null;
  return (
    <Box
      flex={1}
      backgroundColor="modalWithOpacity"
      justifyContent="flex-end"
      style={styles.container}
    >
      <Box
        padding="spacing-m"
        backgroundColor="white"
        borderTopEndRadius={20}
        borderTopStartRadius={20}
      >
        <Pressable onPress={onClose}>
          <Box
            alignSelf="flex-end"
            backgroundColor="secundaryDisable"
            borderRadius={24}
            padding="spacing-xxxxs"
          >
            <Close />
          </Box>
        </Pressable>
        {Platform.OS === 'ios' && (
          <Box position="absolute" top={12} alignSelf="center">
            <ApplePay />
          </Box>
        )}
        {Platform.OS === 'ios' ? contentiOS() : contentAndroid()}
      </Box>
    </Box>
  );
};

export default BottomSheetPayWithIO;
