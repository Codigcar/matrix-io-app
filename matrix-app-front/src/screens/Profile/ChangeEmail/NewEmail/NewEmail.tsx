import React from 'react';
import { ThemeProvider } from '@shopify/restyle';
import { Box, Button, Container, Text, TextInput, rebrandingTheme } from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { Form } from 'src/components/Form';
import { RegexReplaceEmail } from 'src/utils/regex/InputValidator';
import { INPUT_MAX_LENGTH_EMAIL } from 'src/utils/constants';
import useEmail from './hooks/useNewEmail';

const NewEmail = (props: NavigationPropsType) => {
  const { navigation } = props;
  const { submitEmail, checkValidation, isButtonEnabled, onPressBackArrow } = useEmail(props);

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
          goBackNavigate={onPressBackArrow}
        >
          <Form
            onSubmit={submitEmail}
            initialValues={{
              email: '',
              emailConfirmation: '',
            }}
            enableReinitialize
            validateOnMount
            validateOnChange
          >
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleSubmit,
              setFieldTouched,
              setErrors,
            }) => (
              <Box flex={1} mt="spacing-xxs" mx="spacing-m" pt="spacing-m">
                <Text variant="Heading20Medium" mb="spacing-s">
                  {i18n.t('change-email.new.title')}
                </Text>
                <Text variant="body14Regular" mb="spacing-s">
                  {i18n.t('change-email.new.subtitle')}
                </Text>

                <TextInput
                  label={i18n.t('change-email.new.label')}
                  placeholder={i18n.t('change-email.new.placeholder')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(text) => {
                    handleChange('email')(text.replace(RegexReplaceEmail, ''));
                    setFieldTouched('email', true, false);
                    checkValidation(text, setErrors);
                  }}
                  maxLength={INPUT_MAX_LENGTH_EMAIL}
                  value={values.email}
                  textHelper={errors.email}
                  error={errors.email}
                  containerProps={{ marginBottom: 'spacing-s' }}
                />

                <Box paddingVertical="spacing-xs">
                  <TextInput
                    label={i18n.t('change-email.new.label-repeat')}
                    placeholder={i18n.t('change-email.new.placeholder-repeat')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(text) => {
                      handleChange('emailConfirmation')(text.replace(RegexReplaceEmail, ''));
                      setFieldTouched('emailConfirmation', true, false);
                      checkValidation(text, setErrors);
                    }}
                    maxLength={INPUT_MAX_LENGTH_EMAIL}
                    value={values.emailConfirmation}
                    textHelper={errors.emailConfirmation}
                    error={errors.emailConfirmation}
                    containerProps={{ marginBottom: 'spacing-s' }}
                  />
                </Box>

                <Button
                  disabled={!isValid || !isButtonEnabled}
                  variant={!isValid || !isButtonEnabled ? 'disabled' : 'primary'}
                  mt="spacing-s"
                  label={i18n.t('button-label-continue')}
                  onPress={handleSubmit}
                />
              </Box>
            )}
          </Form>
        </Container>
      </BackgroundWrapper>
    </ThemeProvider>
  );
};

export default NewEmail;
