import React from 'react';
import {
  Container, Box, Text, fonts, Button,
} from 'matrix-ui-components';
import { Background } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import CheckWarning from 'assets/svgs/check_warning.svg';
import IcoBiometria from 'assets/svgs/ico-biometria.svg';
import { NavigationPropsType } from 'src/types/types';

const ReplacementValidationError = (props: NavigationPropsType) => {
  const { navigation } = props;
  return (
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
          {i18n.t('CardReplacement.validation-error.title')}
        </Text>
        <Text
          my="spacing-xxs"
          mx="spacing-m"
          mb="spacing-xs"
          variant="SubTitle"
          textAlign="center"
          fontFamily={fonts.euclidCircularRegular}
        >
          {i18n.t('CardReplacement.validation-error.subtitle')}
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
          {i18n.t('CardReplacement.validation-error.message')}
        </Text>
      </Box>
      <Button
        variant="primary"
        mx="spacing-m"
        mb="spacing-l"
        onPress={() => {}}
        label={i18n.t('CardReplacement.validation-error.button')}
        disabled={false}
        justifyContent="space-around"
      />
    </Container>
  );
};

export default ReplacementValidationError;
