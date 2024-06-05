import React from 'react';
import {
  Container, Box, Text, Button, TextInput,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { INPUT_MAX_LENGTH } from 'src/utils/constants';
import { Form } from 'src/components/Form';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import useRepeatPasswordPresenter from './repeat-password.presenter';

export const RepeatPasswordScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.PASSWORD_REPEAT>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const { password, onPressContinue, onPressBackArrow } = useRepeatPasswordPresenter(props);

  return (
    <BackgroundWrapper>
      <Form
        initialValues={{
          password,
          passwordConfirmation: '',
        }}
        validateOnMount
        onSubmit={onPressContinue}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, errors, isValid,
        }) => (
          <Container
            withInput
            imageBackground="none"
            hasGradient={false}
            goBackNavigate={onPressBackArrow}
            isHeaderTransparent
            keyboardShouldPersistTaps="handled"
            isHeaderVisible
            isScrollable
          >
            <Box flex={1} m="spacing-m" mt="spacing-l" justifyContent="space-between">
              <Box>
                <Box>
                  <Text variant="Heading20SemiBold">
                    {i18n.t('password-repeat-titles-good')}
                    <Text variant="Heading20Regular">
                      {i18n.t('password-repeat-titles-good-now')}
                    </Text>
                  </Text>
                  <Text variant="Heading20Regular">
                    {i18n.t('password-repeat-titles-repeat-password')}
                  </Text>
                </Box>
                <Box mt="spacing-m">
                  <TextInput
                    label={i18n.t('password-repeat-input-password')}
                    placeholder={i18n.t('password-repeat-input-password')}
                    value={values.password}
                    secureTextEntry
                    disabled
                    testID="passwordInput"
                  />
                </Box>
                <Box mt="spacing-m">
                  <TextInput
                    containerProps={{ marginBottom: 'spacing-s' }}
                    label={i18n.t('password-repeat-input-repeat-password')}
                    placeholder={i18n.t('password-repeat-input-repeat-password-again')}
                    textHelper={i18n.t('password-repeat-error-password-must-match')}
                    showTextHelper
                    value={values.passwordConfirmation}
                    secureTextEntry
                    contextMenuHidden
                    maxLength={INPUT_MAX_LENGTH}
                    onBlur={handleBlur('passwordConfirmation')}
                    onChangeText={handleChange('passwordConfirmation')}
                    error={Boolean(errors.passwordConfirmation)}
                    autoFocus
                    testID="passwordConfirmation"
                  />
                </Box>
              </Box>
              <Button
                label={i18n.t('password-confirmation-buttons-continue')}
                variant={isValid ? 'primary' : 'disabled'}
                onPress={() => handleSubmit()}
                disabled={!isValid}
                testID="SubmitButton"
                mt="spacing-xm"
              />
            </Box>
          </Container>
        )}
      </Form>
    </BackgroundWrapper>
  );
};

export default RepeatPasswordScreen;
