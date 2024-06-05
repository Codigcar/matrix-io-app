import React from 'react';
import {
  Text, Box, fonts, Container, Button,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { Background } from 'assets/images';
import PayApplePay from 'assets/svgs/pay_with_apple_pay.svg';
import useCardConfigure from './hooks/useCardConfiguration';
import CardState from './components/CardState';

const ConfigureApplePay = (props: NavigationPropsType) => {
  const { onPressBackArrow } = useCardConfigure(props);
  return (
    <Container
      imageBackground={Background}
      isHeaderVisible
      goBackNavigate={onPressBackArrow}
      headerTitle={i18n.t('wallet-flow.applePay.label')}
    >
      <Box marginHorizontal="spacing-m">
        <Box justifyContent="center" alignItems="center" mt="spacing-l">
          <PayApplePay />
        </Box>
        <Box
          marginHorizontal="spacing-s"
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
            {i18n.t('wallet-flow.applePay.affiliate.card')}
          </Text>
        </Box>
        <CardState />
        <Box
          mt="spacing-m"
          mb="spacing-m"
          paddingHorizontal="spacing-m"
          paddingVertical="spacing-s"
          backgroundColor="feedbackInformativeLightest"
          borderWidth={1}
          borderRadius={16}
          borderColor="feedbackInformativeLightest"
        >
          <Text
            textAlign="center"
            variant="label"
            fontSize={14}
            fontFamily={fonts.euclidCircularRegular}
            numberOfLines={2}
            color="primaryDark"
          >
            {i18n.t('wallet-flow.applePay.affiliate.unsubscribe-card')}
            <Text
              textAlign="center"
              variant="label"
              fontSize={14}
              fontFamily={fonts.euclidCircularRegular}
              numberOfLines={2}
              color="textLink"
            >
              {i18n.t('wallet-flow.applePay.affiliate.unsubscribe-wallet')}
            </Text>
          </Text>
        </Box>
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

export default ConfigureApplePay;
