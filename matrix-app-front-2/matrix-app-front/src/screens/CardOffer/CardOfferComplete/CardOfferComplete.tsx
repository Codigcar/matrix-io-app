import React, { useEffect } from 'react';
import {
  Text, Box, Container, Button,
} from 'matrix-ui-components';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import moment from 'moment-timezone';
import 'moment/locale/es';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { RFValue } from 'react-native-responsive-fontsize';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import LottieView from 'lottie-react-native';
import { s, vs } from 'src/utils/sizes';
import { BackgroundAltScreen } from 'assets/svgs';
import useCardOfferComplete from './hooks/useCardOfferComplete';
import BenefitListComplete from '../OfferDetails/components/BenefitListComplete';

const CardOfferComplete = (props: NavigationPropsType) => {
  const { onPressContinue, getLocale } = useCardOfferComplete(props);
  moment.locale(getLocale());

  useEffect(() => {
    analyticsManagerProvider.logEventWithType({
      valor: 'tc felicidades',
    }, AnalyticsProviderType.appsFlyer, AFLoggerEvents.successfulTC);
  }, []);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        hasGradient={false}
        background={BackgroundAltScreen}
        imageBackground="none"
      >
        <Box flex={1} px="spacing-m" pt="spacing-s">
          <Box
            mt="spacing-l"
            mb="spacing-sm"
            alignSelf="center"
            width={vs(83)}
            height={vs(83)}
            alignItems="center"
            justifyContent="center"
          >
            <LottieView source={CheckSuccess} autoPlay loop={false} />
          </Box>

          <Text textAlign="center" variant="Heading28Medium" mb="spacing-xxxs">
            {i18n.t('card-offer-complete-title')}
          </Text>

          <Box maxWidth={s(260)} alignSelf="center" mb="spacing-xxxs">
            <Text mt="spacing-xxs" textAlign="center" variant="body14Regular">
              {i18n.t('card-offer-complete-subtitle')}
            </Text>
          </Box>

          <BenefitListComplete />
          <Box position="absolute" width="100%" bottom={RFValue(20)} alignSelf="center">
            <Button
              variant="primary"
              mt="spacing-m"
              onPress={() => onPressContinue()}
              label={i18n.t('button-label-continue')}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CardOfferComplete;
