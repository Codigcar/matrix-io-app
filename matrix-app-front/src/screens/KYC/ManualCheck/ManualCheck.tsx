/* eslint-disable react-native/no-raw-text */
import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import {
  Box,
  Text,
  spacing,
  SafeAreaBox,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CheckError from 'assets/svgs/check-error.svg';
import useManualCheck from './hooks/useManualCheck';

export const ManualCheck = (props: NavigationPropsType) => {
  const { messageFeedback, FlowImage, closeApp } = useManualCheck(props);

  useEffect(() => {
    const backListener = BackHandler.addEventListener('hardwareBackPress', closeApp);
    return () => backListener.remove();
  }, []);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box width={spacing['spacing-ml']} height={spacing['spacing-ml']}>
            <CheckError />
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-s">
            {i18n.t('manual-check.title')}
          </Text>
          <Text variant="SubTitle18Regular" textAlign="center">
            {i18n.t(messageFeedback)}
          </Text>
          <Box my="spacing-m">
            <FlowImage height={RFValue(138)} width={RFValue(138)} />
          </Box>
          <Text variant="body14Regular" textAlign="center">
            {`${i18n.t('manual-check.feedback-1')} `}
            <Text variant="body14SemiBold">
              {`${i18n.t('manual-check.feedback-2')} `}
            </Text>
            {i18n.t('manual-check.feedback-3')}
          </Text>
          <Text variant="body14Regular" mt="spacing-s">
            {i18n.t('manual-check.feedback-4')}
          </Text>
        </Box>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};

export default ManualCheck;
