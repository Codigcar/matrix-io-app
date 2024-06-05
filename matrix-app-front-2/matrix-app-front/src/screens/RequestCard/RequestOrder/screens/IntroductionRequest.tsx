import React from 'react';
import {
  Container,
  Text,
  Box,
  Button,
  rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationPropsType } from 'src/types/types';
import { PosConcept } from 'assets/svgs';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigation } from 'src/utils/navigationHandler';

const IntroductionRequestScreen = (props: NavigationPropsType) => {
  const { navigation } = props;

  const goToRequest = () => {
    navigation.navigate(navigationScreenNames.physicalCard.location, {
      onboarding: true,
    });
  };
  const goToHome = () => {
    resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
  };
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        imageBackground={BackgroundNew}
        isHeaderVisible={false}
      >
        <Box flex={1} m="spacing-m" mt="spacing-xl" pb="spacing-s" justifyContent="space-evenly">
          <Box>
            <Text variant="Heading28Medium" textAlign="center">
              {i18n.t('request-card.introductionRequest.title')}
            </Text>
            <Text variant="body14pxRegular" mt="spacing-s" textAlign="center">
              {i18n.t('request-card.introductionRequest.description')}
            </Text>
          </Box>
          <Box mb="spacing-xs">
            <PosConcept />
          </Box>
          <Box>
            <Button
              variant="primary"
              onPress={goToRequest}
              label={i18n.t('request-card.introductionRequest.continue')}
            />
            <Button
              variant="secondary"
              onPress={goToHome}
              label={i18n.t('request-card.introductionRequest.cancel')}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default IntroductionRequestScreen;
