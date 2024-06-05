import React from 'react';
import {
  Box, Container, Text, Button, TextInput,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { RegexReplaceDni } from 'src/utils/regex/InputValidator';

import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { Form } from 'src/components/Form';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import useMTXGetDNI from '../hooks/useMtxGetDNI';

export const GetDocumentScreen: React.FC<NavigationPropsType> = (props) => {
  const { navigation } = props;
  const { onPressSubmitButton } = useMTXGetDNI(props);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        hasGradient={false}
        keyboardShouldPersistTaps="handled"
        imageBackground="none"
        isHeaderVisible
        goBackNavigate={() => navigation.goBack()}
      >
        <Box flex={1} m="spacing-m" justifyContent="flex-end">
          <Box mb="spacing-s">
            <Text variant="Heading20Medium">{i18n.t('forgotPassword.getDocument.title')}</Text>
          </Box>
          <Form
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
                  error={errors.dni}
                  autoFocus
                  contextMenuHidden
                />
                <Button
                  variant={isSubmitting || !isValid ? 'disabled' : 'primary'}
                  mt="spacing-xm"
                  testID="SubmitDNI"
                  onPress={handleSubmit}
                  label={i18n.t('forgotPassword.getDocument.button-text')}
                  disabled={isSubmitting || !isValid}
                />
              </>
            )}
          </Form>
        </Box>
        <ReCaptchaModalError />
      </Container>
    </BackgroundWrapper>
  );
};
export default GetDocumentScreen;
