import React from 'react';
import {
  Box,
  Container,
  Text,
  Button,
  TextInput,
} from 'matrix-ui-components';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { i18n } from 'src/utils/core/MTXStrings';
import { NEW_PASSWORD_REQUIREMENTS, INPUT_MAX_LENGTH } from 'src/utils/constants';
import { TickCircle, TickCircleUncheck } from 'assets/svgs';
import { Form } from 'src/components/Form';
import { s } from 'src/utils/sizes';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useNewPasswordPresenter from './new-password.presenter';

export const NewPasswordScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'NewPassword'>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const {
    checkOptions,
    onPressContinue,
    onPressBackArrow,
    feedbackIsVisible,
    repeatRef,
    setFeedbackIsVisible,
  } = useNewPasswordPresenter(props);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        isScrollable
        imageBackground="none"
        hasGradient={false}
        isHeaderTransparent
        isHeaderVisible
        keyboardShouldPersistTaps="handled"
        goBackNavigate={onPressBackArrow}
      >
        <Form
          initialValues={{
            password: '',
            passwordConfirmation: '',
          }}
          onSubmit={onPressContinue}
          validateOnMount
          validateOnBlur
          validateOnChange
        >
          {({
            values, handleSubmit, handleChange, errors, isValid, isSubmitting,
          }) => (
            <Box flex={1} m="spacing-m" mt="spacing-none">
              <Box flex={1} justifyContent="center">
                <Box mb="spacing-xxs">
                  <Text variant="Heading20Medium">
                    {i18n.t('forgotPassword.newPassword.title')}
                  </Text>
                </Box>
                <Box mt="spacing-xxs" mb="spacing-xs">
                  <TextInput
                    label={i18n.t('forgotPassword.newPassword.input-label')}
                    error={Boolean(errors.password)}
                    maxLength={INPUT_MAX_LENGTH}
                    testID="password"
                    secureTextEntry
                    disableCopyPaste
                    placeholder={i18n.t('forgotPassword.newPassword.input-placeholder')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    autoFocus
                    onFocus={() => {
                      setFeedbackIsVisible(true);
                    }}
                    onBlur={() => {
                      setFeedbackIsVisible(false);
                    }}
                    onSubmitEditing={() => {
                      repeatRef.current?.focus();
                    }}
                    textHelper={i18n.t('forgotPassword.newPassword.input-feedback')}
                    showTextHelper
                    returnKeyType="next"
                    blurOnSubmit={false}
                  />
                </Box>
                {feedbackIsVisible && !!values.password && (
                  <Box
                    shadowColor="primary1000"
                    shadowOffset={{
                      height: 0,
                      width: 4,
                    }}
                    mt="spacing-m"
                    shadowOpacity={0.1}
                    shadowRadius={8}
                    px="spacing-sm"
                    py="spacing-s"
                    elevation={8}
                    backgroundColor="primary000"
                    width="100%"
                    borderRadius={20}
                  >
                    {NEW_PASSWORD_REQUIREMENTS.map((validation) => (
                      <Box
                        key={validation}
                        flexDirection="row"
                        alignItems="flex-start"
                        my="spacing-xxxxs"
                      >
                        {checkOptions(validation, values.password) ? (
                          <TickCircle width={s(24)} height={s(24)} />
                        ) : (
                          <TickCircleUncheck width={s(24)} height={s(24)} />
                        )}
                        <Box ml="spacing-xxs" flex={1}>
                          <Text variant="body13Regular">
                            {i18n.t(`forgotPassword.newPassword.${validation}`)}
                          </Text>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
                <Box mt="spacing-xs">
                  <TextInput
                    innerRef={repeatRef}
                    label={i18n.t('forgotPassword.newPassword.input-repeat-label')}
                    error={Boolean(errors.passwordConfirmation)}
                    maxLength={INPUT_MAX_LENGTH}
                    secureTextEntry
                    disableCopyPaste
                    containerProps={{
                      marginTop: 'spacing-xxs',
                    }}
                    testID="password_repeat"
                    placeholder={i18n.t('forgotPassword.newPassword.input-repeat-placeholder')}
                    onChangeText={handleChange('passwordConfirmation')}
                    value={values.passwordConfirmation}
                    returnKeyType="done"
                    blurOnSubmit
                    textHelper={i18n.t('forgotPassword.newPassword.input-repeat-feedback')}
                    showTextHelper
                  />
                </Box>
              </Box>
              <Button
                mt="spacing-l"
                variant={isValid ? 'primary' : 'disabled'}
                onPress={() => handleSubmit()}
                testID="submit-new-password"
                label={i18n.t('forgotPassword.newPassword.button-text')}
                disabled={!isValid}
              />
              <LoadingIndicator isVisible={!!isSubmitting} />
              <ReCaptchaModalError />
            </Box>
          )}
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default NewPasswordScreen;
