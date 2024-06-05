import React from 'react';
import {
  Text, Box, fonts, Container, Button,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { Background } from 'assets/images';
import PayWithNFC from 'assets/svgs/pay_with_nfc_io.svg';
import useCardConfigure from './hooks/useCardConfiguration';
import CardState from './components/CardState';

const ConfigureNFC = (props: NavigationPropsType) => {
  const { onPressBackArrow } = useCardConfigure(props);

  return (
    <Container
      imageBackground={Background}
      isHeaderVisible
      goBackNavigate={onPressBackArrow}
      headerTitle={i18n.t('wallet-flow.pay-with-nfc')}
    >
      <Box marginHorizontal="spacing-m">
        <Box justifyContent="center" alignItems="center" mt="spacing-m">
          <PayWithNFC />
        </Box>
        <Box
          marginHorizontal="spacing-m"
          marginVertical="spacing-m"
          justifyContent="center"
          alignItems="center"
        >
          <Text
            textAlign="center"
            variant="H3"
            fontFamily={fonts.euclidCircularBold}
            numberOfLines={2}
          >
            {i18n.t('wallet-flow.nfc.affiliate.card')}
          </Text>
        </Box>
        <Box marginVertical="spacing-xs">
          <Text
            textAlign="center"
            variant="label"
            fontFamily={fonts.euclidCircularRegular}
            color="primaryDarkest"
          >
            {i18n.t('wallet-flow.nfc.affiliate.success')}
          </Text>
        </Box>
        <CardState />
      </Box>
      <Box justifyContent="flex-end" flex={1} marginHorizontal="spacing-m">
        <Button
          variant="primary"
          disabled={false}
          marginVertical="spacing-m"
          onPress={() => {}}
          label={i18n.t('wallet-flow.end')}
        />
      </Box>
    </Container>
  );
};

export default ConfigureNFC;
