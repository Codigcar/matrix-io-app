import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { Box, Text, Button, SafeAreaBox } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { screenWidth } from 'src/utils/constants';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CheckDanger } from 'assets/svgs';

const NewAddress = ({ navigation }: NavigationPropsType) => {
  const onPressFinish = () => navigation.navigate(navigationScreenNames.home);
  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1}>
        <Box flex={1} mx="spacing-m" alignItems="center">
          <Box flex={1} mx="spacing-m" pt="spacing-xl" alignItems="center" justifyContent="center">
            <CheckDanger />
            <Text mt="spacing-xl" variant="Heading28Medium" textAlign="center">
              {i18n.t('changeData.notAvailable.title')}
            </Text>
            <Text mt="spacing-s" mb="spacing-xxm" variant="SubTitle18Regular" textAlign="center">
              {i18n.t('changeData.notAvailable.subtitle')}
            </Text>
            <Text pb="spacing-ml" variant="body14Regular" textAlign="center">
              {i18n.t('changeData.notAvailable.description')}
            </Text>
          </Box>
          <Button
            variant="primary"
            width={screenWidth - 48}
            mb="spacing-m"
            onPress={onPressFinish}
            label={i18n.t('changeData.notAvailable.button-finish')}
          />
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default NewAddress;
