import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { Box, Button, Container, Text, TextInput, rebrandingTheme } from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { i18n } from 'src/utils/core/MTXStrings';
import { Platform } from 'react-native';
import { NavigationPropsType } from 'src/types/types';

const CurrentEmail = (props: NavigationPropsType) => {
  const _prop = props;
  const { navigation } = props;
  const currentEmail = 'vict**@gm***.com';
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <BackgroundWrapper>
        <Container
          withInput
          imageBackground="none"
          isScrollable
          hasGradient={false}
          isHeaderVisible
          isHeaderTransparent
          keyboardShouldPersistTaps="always"
          goBackNavigate={() => navigation.goBack()}
        >
          <Box flex={1} mt="spacing-xxs" mx="spacing-m" pt="spacing-xl">
            <Text variant="Heading20Medium" mb="spacing-s">
              {i18n.t('change-email.edit.title')}
            </Text>

            <Text mb="spacing-s">
              <Text variant="body14Regular">{i18n.t('change-email.edit.subtitle')}</Text>
              <Text variant="body14SemiBold">{currentEmail}</Text>
            </Text>

            <TextInput
              label={i18n.t('change-email.edit.label')}
              placeholder={i18n.t('change-email.edit.placeholder')}
              maxLength={10}
              autoCapitalize="none"
              keyboardType={Platform.OS === 'android' ? 'visible-password' : 'email-address'}
              testID="emailInput"
              textHelper={i18n.t('Supports.errorMessage')}
              containerProps={{ marginBottom: 'spacing-s' }}
            />

            <Button mt="spacing-s" label={i18n.t('button-label-continue')} />
          </Box>
        </Container>
      </BackgroundWrapper>
    </ThemeProvider>
  );
};

export default CurrentEmail;
