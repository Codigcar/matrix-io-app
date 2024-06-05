import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, SafeAreaBox, Text, Button,
} from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CheckDanger } from 'assets/svgs';
import { string } from '../../shared/strings/string';

const ChangePinError: React.FC<NavigationPropsType> = (props) => {
  const { navigation } = props;
  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box mt="spacing-l" mb="spacing-xl">
            <CheckDanger />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-m">
            {string.changePingChangeErrorTitle}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {string.changePinChangeErrorSubTitle}
          </Text>
          <Text variant="body14Regular" textAlign="center" mt="spacing-xm">
            {string.changePinChangeErrorMessage}
          </Text>
        </Box>
        <Button
          label={string.changePinChangeErrorSubmit}
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
        />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default ChangePinError;
