import React from 'react';
import { Box, Container, Text, Button, TextInput } from 'matrix-ui-components';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { NEW_PASSWORD_REQUIREMENTS, INPUT_MAX_LENGTH } from 'src/utils/constants';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { TickCircle, TickCircleUncheck } from 'assets/svgs';
import { Form } from 'src/components/Form';
import { s, vs } from 'src/utils/sizes';
import useNewPassword from '../hooks/useNewPassword';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';

const NewPasswordScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    checkOptions,
    onPressContinue,
    onPressBackArrow,
    feedbackIsVisible,
    repeatRef,
    setFeedbackIsVisible,
  } = useNewPassword(props);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        isScrollable
        imageBackground="none"
        hasGradient={false}
        keyboardShouldPersistTaps="handled"
        isHeaderTransparent
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
      >
        <Box flex={1} mx="spacing-m">
          <Box height={vs(60)} />
          <Box mt="spacing-m" mb="spacing-xxs">
            <Text variant="Heading20Medium">{i18n.t('forgotPassword.newPassword.title')}</Text>
          </Box>
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
            {({ values, handleSubmit, handleChange, errors, isValid, isSubmitting }) => (
              <>
                <Box mt="spacing-xxs" mb="spacing-xs" zIndex={20}>
                  <TextInput
                    label={i18n.t('forgotPassword.newPassword.input-label')}
                    error={!!errors.password}
                    maxLength={INPUT_MAX_LENGTH}
                    testID="password"
                    secureTextEntry
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
                    contextMenuHidden
                  />
                </Box>
                <Box flex={1} justifyContent="space-between">
                  <Box mt="spacing-xs" zIndex={100}>
                    {feedbackIsVisible && !!values.password && (
                      <Box
                        zIndex={300}
                        shadowColor="primary1000"
                        shadowOffset={{
                          height: 0,
                          width: 4,
                        }}
                        shadowOpacity={0.1}
                        shadowRadius={8}
                        px="spacing-sm"
                        py="spacing-s"
                        elevation={8}
                        position="absolute"
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
                    <TextInput
                      innerRef={repeatRef}
                      label={i18n.t('forgotPassword.newPassword.input-repeat-label')}
                      error={!!errors.passwordConfirmation}
                      maxLength={INPUT_MAX_LENGTH}
                      secureTextEntry
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
                      contextMenuHidden
                    />
                  </Box>
                  <Button
                    variant={isValid ? 'primary' : 'disabled'}
                    mt="spacing-l"
                    mb="spacing-m"
                    onPress={() => handleSubmit()}
                    testID="submit-new-password"
                    label={i18n.t('forgotPassword.newPassword.button-text')}
                    disabled={!isValid}
                  />
                </Box>
                <LoadingIndicator isVisible={!!isSubmitting} />
              </>
            )}
          </Form>
        </Box>
        <ReCaptchaModalError />
      </Container>
    </BackgroundWrapper>
  );
};

export default NewPasswordScreen;
