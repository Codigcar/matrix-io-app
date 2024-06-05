import React, { useRef } from 'react';
import { Box, Container, Text, Button, TextInput } from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { RegexReplaceDni } from 'src/utils/regex/InputValidator';
import { useFocusEffect, CompositeScreenProps } from '@react-navigation/native';
import { Form } from 'src/components/Form';
import { FormikProps } from 'formik';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useValidateDniPresenter from './validate-dni.presenter';

export const ValidateDniScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.PasswordRecoveryNavigator, 'ValidateDni'>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const formikRef = useRef<FormikProps<{ dni: string }>>(null);
  const { onPressSubmitButton, onPressBackArrow } = useValidateDniPresenter(props);

  useFocusEffect(
    React.useCallback(() => {
      formikRef.current?.resetForm();
      formikRef.current?.setSubmitting(false);
    }, []),
  );

  return (
    <BackgroundWrapper>
      <Container
        withInput
        hasGradient={false}
        imageBackground="none"
        isHeaderVisible
        goBackNavigate={onPressBackArrow}
      >
        <Box flex={1} m="spacing-m" justifyContent="flex-end">
          <Box mb="spacing-s">
            <Text variant="Heading20Medium">{i18n.t('forgotPassword.getDocument.title')}</Text>
          </Box>
          <Form
            innerRef={formikRef}
            initialValues={{
              dni: '',
            }}
            onSubmit={onPressSubmitButton}
            validateOnMount
            validateOnChange
          >
            {({
              isSubmitting,
              isValid,
              handleSubmit,
              handleBlur,
              values,
              handleChange,
              errors,
            }) => (
              <>
                <TextInput
                  label={i18n.t('forgotPassword.getDocument.input-label')}
                  keyboardType="decimal-pad"
                  value={values.dni}
                  onChangeText={(text) => handleChange('dni')(text.replace(RegexReplaceDni, ''))}
                  onBlur={handleBlur('dni')}
                  placeholder={i18n.t('forgotPassword.getDocument.input-palceholder')}
                  maxLength={8}
                  testID="DniInput"
                  textHelper={errors.dni}
                  showTextHelper
                  error={Boolean(errors.dni)}
                  disableCopyPaste
                  autoFocus
                  contextMenuHidden
                />
                <Button
                  mt="spacing-m"
                  variant={isSubmitting || !isValid ? 'disabled' : 'primary'}
                  testID="SubmitDNI"
                  onPress={() => handleSubmit()}
                  label={i18n.t('forgotPassword.getDocument.button-text')}
                  disabled={isSubmitting || !isValid}
                />
              </>
            )}
          </Form>
          <ReCaptchaModalError />
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};
export default ValidateDniScreen;
