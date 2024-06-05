import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {
  Text, Box, fonts, Container, Button, CheckBox,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { Background } from 'assets/images';
import Divider from 'src/matrix-ui-components/components/divider';
import PayWithIo from 'assets/svgs/pay_with_io.svg';
import ModalAlert from 'src/components/ModalAlert/ModalAlert';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useCardConfigure from './hooks/useCardConfiguration';
import TyCNFC from './components/TyCNFC';

const PayWithNFC = (props: NavigationPropsType) => {
  const { navigation } = props;
  const { onPressBackArrow } = useCardConfigure(props);
  const [isCheckTyC, setIsCheckTyC] = useState(false);
  const [isActiveNfc, setIsActiveNfc] = useState(false);

  const onHandlePress = () => setIsActiveNfc(true);

  const onCloseModal = () => {
    setIsActiveNfc(false);
    navigation.navigate(navigationScreenNames.configureNFC);
  };
  return (
    <Container
      imageBackground={Background}
      isHeaderVisible
      goBackNavigate={onPressBackArrow}
      headerTitle={i18n.t('wallet-flow.pay-with-nfc')}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box justifyContent="center" alignItems="center" mt="spacing-xxxxs">
          <PayWithIo />
        </Box>
        <Box
          mr="spacing-m"
          ml="spacing-m"
          justifyContent="center"
          alignItems="center"
          mt="spacing-s"
          mb="spacing-m"
        >
          <Text
            textAlign="center"
            variant="H3"
            fontFamily={fonts.euclidCircularBold}
            numberOfLines={2}
          >
            {i18n.t('wallet-flow.pay-with-io-title-android')}
          </Text>
        </Box>
        <Box marginHorizontal="spacing-m">
          <TyCNFC />
          <Divider height={12} />
          <CheckBox
            marginBottom="spacing-s"
            marginRight="spacing-l"
            label={i18n
              .t('wallet-flow.pay-with-nfc-accept')
              .concat(i18n.t('wallet-flow.pay-with-nfc-accept-tyc'))}
            onPress={() => setIsCheckTyC(!isCheckTyC)}
            isCheck={isCheckTyC}
          />
        </Box>
      </ScrollView>
      <Button
        variant={isCheckTyC ? 'primary' : 'disabled'}
        disabled={!isCheckTyC}
        m="spacing-m"
        onPress={onHandlePress}
        label={i18n.t('wallet-flow.pay-with-nfc-continue')}
      />
      <ModalAlert
        isVisible={isActiveNfc}
        title={i18n.t('wallet-flow.nfc.activate.title')}
        message={i18n.t('wallet-flow.nfc.activate.message')}
        buttonText={i18n.t('wallet-flow.set-up')}
        icon="checkWarning"
        close={onCloseModal}
      />
    </Container>
  );
};

export default PayWithNFC;
