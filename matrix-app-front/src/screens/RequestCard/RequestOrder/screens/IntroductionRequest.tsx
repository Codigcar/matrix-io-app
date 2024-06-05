import React from 'react';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationPropsType } from 'src/types/types';
import { PosConcept } from 'assets/svgs';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigation } from 'src/utils/navigationHandler';
import { string } from '../../shared/strings/string';

const IntroductionRequestScreen: React.FC<NavigationPropsType> = (props) => {
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
      <Container imageBackground={BackgroundNew} isHeaderVisible={false}>
        <Box flex={1} m="spacing-m" mt="spacing-xl" pb="spacing-s" justifyContent="space-evenly">
          <Box>
            <Text variant="Heading28Medium" textAlign="center">
              {string.requestCardIntroductionRequestTitle}
            </Text>
            <Text variant="body14pxRegular" mt="spacing-s" textAlign="center">
              {string.requestCardIntroductionRequestDescription}
            </Text>
          </Box>
          <Box mb="spacing-xs">
            <PosConcept />
          </Box>
          <Box>
            <Button
              variant="primary"
              onPress={goToRequest}
              label={string.requestCardIntroductionRequestContinue}
            />
            <Button
              variant="secondary"
              onPress={goToHome}
              label={string.requestCardIntroductionRequestCancel}
            />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default IntroductionRequestScreen;
