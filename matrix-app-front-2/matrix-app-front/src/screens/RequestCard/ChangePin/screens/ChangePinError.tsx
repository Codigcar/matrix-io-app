import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, SafeAreaBox, Text, Button,
} from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { i18n } from 'src/utils/core/MTXStrings';
import { resetNavigation } from 'src/utils/navigationHandler';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CheckDanger } from 'assets/svgs';

const ChangePinError = (props: NavigationPropsType) => {
  const { navigation } = props;
  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box mt="spacing-l" mb="spacing-xl">
            <CheckDanger />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-m">
            {i18n.t('change-pin.change-error.title')}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {i18n.t('change-pin.change-error.sub-title')}
          </Text>
          <Text variant="body14Regular" textAlign="center" mt="spacing-xm">
            {i18n.t('change-pin.change-error.message')}
          </Text>
        </Box>
        <Button
          label={i18n.t('change-pin.change-error.submit')}
          onPress={() => resetNavigation(navigation, navigationScreenNames.bottomTabNavigator)}
        />
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default ChangePinError;
