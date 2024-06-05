import React from 'react';
import {
  Text, Box, Button, SafeAreaBox,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { RFValue } from 'react-native-responsive-fontsize';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { CheckWarning } from 'assets/svgs';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useDateUnvailableError from '../hooks/useDateUnvailableError';

export const DateUnavailableErrorScreen = (props: NavigationPropsType) => {
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
              {i18n.t('request-card.error.schedule-unavailable-title')}
            </Text>
            <Text variant="SubTitle18pxRegular" textAlign="center" mt="spacing-s">
              {i18n.t('request-card.error.schedule-unavailable-subtitle')}
            </Text>
            <Text variant="body14pxRegular" textAlign="center" mt="spacing-xxm">
              {i18n.t('request-card.error.schedule-unavailable-description')}
            </Text>
          </Box>
          <Box>
            <Button
              variant="primary"
              label={i18n.t('request-card.error.schedule-unavailable-button')}
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
