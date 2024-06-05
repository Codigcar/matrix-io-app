import React from 'react';
import {
  Text, Box, Button, SafeAreaBox,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { CheckWarning } from 'assets/svgs';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useDateUnvailableError from '../hooks/useDateUnvailableError';
import { string } from '../../shared/strings/string';

export const DateUnavailableErrorScreen: React.FC<NavigationPropsType> = (props) => {
  const { goToSchedule, isLoading } = useDateUnvailableError(props);
  return (
    <BackgroundWrapper>
      <SafeAreaBox flex={1} mx="spacing-m" py="spacing-m">
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
              {string.requestCardErrorScheduleUnavailableTitle}
            </Text>
            <Text variant="SubTitle18pxRegular" textAlign="center" mt="spacing-s">
              {string.requestCardErrorScheduleUnavailableSubtitle}
            </Text>
            <Text variant="body14pxRegular" textAlign="center" mt="spacing-xxm">
              {string.requestCardErrorScheduleUnavailableDescription}
            </Text>
          </Box>
          <Box>
            <Button
              variant="primary"
              label={string.requestCardErrorScheduleUnavailableButton}
              onPress={goToSchedule}
            />
          </Box>
        </Box>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </SafeAreaBox>
    </BackgroundWrapper>
  );
};
export default DateUnavailableErrorScreen;
