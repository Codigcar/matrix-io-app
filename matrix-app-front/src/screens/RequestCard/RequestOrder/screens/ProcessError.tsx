import React from 'react';
import {
  Text, Box, Button, SafeAreaBox,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { CheckWarning } from 'assets/svgs';
import { resetNavigation } from 'src/utils/navigationHandler';
import { string } from '../../shared/strings/string';

export const ProcessErrorScreen: React.FC<NavigationPropsType> = (props) => {
  const { navigation } = props;

  const goTo = () => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" py="spacing-m" testID="processErrorScreen">
        <Box flex={1} justifyContent="space-between">
          <Box
            mt="spacing-custom-l"
            maxWidth="100%"
            alignSelf="center"
            alignItems="center"
            justifyContent="center"
          >
            <CheckWarning width={RFValue(68)} height={RFValue(68)} />
            <Text variant="Heading28pxMedium" textAlign="center" mt="spacing-xl">
              {string.requestCardErrorProcessErrorTitle}
            </Text>
            <Text variant="SubTitle18pxRegular" textAlign="center" mt="spacing-s">
              {string.requestCardErrorProcessErrorSubtitle}
            </Text>
            <Text variant="body14pxRegular" textAlign="center" mt="spacing-xxm">
              {string.requestCardErrorProcessErrorDescription}
            </Text>
          </Box>
          <Box>
            <Button
              variant="primary"
              label={string.requestCardErrorProcessErrorButon}
              onPress={goTo}
              testID="errorScreenButton"
            />
          </Box>
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
export default ProcessErrorScreen;
