import React from 'react';
import { Box, SafeAreaBox, Text } from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { NavigationPropsType } from 'src/types/types';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import CircularProgressBar from '../../../Wellcome/Wellcome/CircularProgressBar';
import { CardPaymentProps } from '../../shared/types';
import { usePaymentLoading } from './payment-loading.presenter';

export const PaymentLoading: React.FC<CardPaymentProps & NavigationPropsType> = (props) => {
  const { StatusImage, screenContent, progress } = usePaymentLoading(props);

  return (
    <BackgroundWrapper>
      <SafeAreaBox testID="payment-loading" flex={1} alignItems="center" justifyContent="center">
        <Box width={RFValue(120)} height={RFValue(160)}>
          <StatusImage />
        </Box>
        <Box mt="spacing-xxxm" height={RFValue(50)}>
          <Text variant="Heading20Medium" textAlign="center">
            {screenContent.title}
          </Text>
        </Box>
        <Box my="spacing-l" height={RFValue(70)}>
          <CircularProgressBar percent={progress} />
        </Box>
        <Text variant="SubTitle16" textAlign="center">
          {screenContent.description}
        </Text>
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
