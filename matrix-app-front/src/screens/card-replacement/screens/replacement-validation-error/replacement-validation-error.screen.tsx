import React from 'react';
import { Container, Box, Text, fonts, Button } from 'matrix-ui-components';
import { Background } from 'assets/images';
import CheckWarning from 'assets/svgs/check_warning.svg';
import IcoBiometria from 'assets/svgs/ico-biometria.svg';
import { string } from '../../shared/strings/string';

export const ReplacementValidationErrorScreen: React.FC = () => (
  <Container withInput imageBackground={Background}>
    <Box flex={1} my="spacing-xl" mx="spacing-m" justifyContent="center" alignItems="center">
      <Box alignItems="center" paddingTop="spacing-l" paddingBottom="spacing-s" mt="spacing-l">
        <CheckWarning />
      </Box>
      <Text
        my="spacing-xxs"
        mb="spacing-xxxs"
        variant="H3"
        fontFamily={fonts.euclidCircularSemibold}
      >
        {string.cardReplacementValidationErrorTitle}
      </Text>
      <Text
        my="spacing-xxs"
        mx="spacing-m"
        mb="spacing-xs"
        variant="SubTitle"
        textAlign="center"
        fontFamily={fonts.euclidCircularRegular}
      >
        {string.cardReplacementValidationErrorSubtitle}
      </Text>
      <IcoBiometria width={140} height={180} />
      <Text
        mt="spacing-xs"
        mb="spacing-l"
        mx="spacing-m"
        variant="label"
        textAlign="center"
        fontFamily={fonts.euclidCircularRegular}
      >
        {string.cardReplacementValidationErrorMessage}
      </Text>
    </Box>
    <Button
      variant="primary"
      mx="spacing-m"
      mb="spacing-l"
      onPress={() => {}}
      label={string.cardReplacementValidationErrorButton}
      disabled={false}
      justifyContent="space-around"
    />
  </Container>
);
