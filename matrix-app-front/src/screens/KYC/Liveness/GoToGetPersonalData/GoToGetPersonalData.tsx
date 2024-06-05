import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Box, SafeAreaBox, Text, spacing, Button,
} from 'matrix-ui-components';
import { RFValue } from 'react-native-responsive-fontsize';
import LottieView from 'lottie-react-native';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import IcoBiometria from 'assets/svgs/ico-biometria.svg';
import CheckWarning from 'assets/svgs/check-warning2.svg';
import CheckSuccess from 'assets/lottie/ConfirmationCheck.json';
import useGoToPersonalData from './hooks/useGoToGetPersonalData';

const GoToGetPersonalData = (props: NavigationPropsType) => {
  const {
    onButtonPress, renderTitle, status, process, screenStatus, isLoading, failureMsg,
  } = useGoToPersonalData(props);

  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" mb="spacing-l" justifyContent="space-between">
        <Box flex={1} alignItems="center" justifyContent="center">
          <Box width={spacing['spacing-ml']} height={spacing['spacing-ml']}>
            {status === 'success' || process === 'userBlocked' ? (
              <LottieView source={CheckSuccess} autoPlay loop />
            ) : (
              <CheckWarning />
            )}
          </Box>
          <Text variant="Heading32Medium" textAlign="center" mt="spacing-xm" mb="spacing-s">
            {renderTitle()}
          </Text>
          {screenStatus?.subTitle ? (
            <Text variant="SubTitle18Regular" textAlign="center">
              {screenStatus.subTitle}
            </Text>
          ) : null}
          {screenStatus.hasImage ? (
            <Box my="spacing-xxxm">
              <IcoBiometria height={RFValue(138)} />
            </Box>
          ) : null}
          <Text variant="body14Regular" textAlign="center">
            {status === 'failed' ? failureMsg() : screenStatus.description}
          </Text>
        </Box>
        <Button
          label={screenStatus.buttonLabel}
          onPress={onButtonPress}
          analytics={status === 'success' || status === 'userBlocked' ? { seccion: 'Error' } : {}}
        />
      </SafeAreaBox>
      <LoadingIndicator isVisible={isLoading} />
    </BackgroundWrapper>
  );
};

export default GoToGetPersonalData;
