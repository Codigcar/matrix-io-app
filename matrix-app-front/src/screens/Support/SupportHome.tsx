/* eslint-disable object-curly-newline */
/* eslint-disable import/no-relative-packages */
import React from 'react';
import { Platform } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import useKeyboard from 'src/utils/hooks/useKeyboard';
import { Container, Box, Button, Text, TextInput } from 'matrix-ui-components';
import {
  DOCUMENT_NUMBER_LENGHT,
  INPUT_MAX_LENGTH,
  INPUT_MAX_LENGTH_EMAIL,
  PHONE_NUMBER_LENGHT,
  GCP_RECAPTCHA_DOMAIN_NAME,
  RECAPTCHA_ACTIONS,
  GCP_RECAPTCHA_KEY_ID,
} from 'src/utils/constants';
import {
  RegexReplaceDni,
  RegexReplaceEmail,
} from 'src/utils/regex/InputValidator';
import { i18n } from 'src/utils/core/MTXStrings';
import ReCaptchaV3 from 'src/components/ReCaptchaV3';
import { Form } from 'src/components/Form';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useSupport from './hooks/useSupport';
import WarningModal from './modal/WarningModal';
import Successful from './components/Successful';

const SupportHome = (props: NavigationPropsType) => {
  const {
    reCaptchaRef,
    onPressContinue,
    onPressBackArrow,
    onPrivacyPress,
    onReceiveReCaptchaToken,
    result,
    statusButton,
    closeModal,
    isModalOpen,
  } = useSupport(props);
  const { isKeyboardVisible } = useKeyboard();

  return (
    <BackgroundWrapper>
      {result ? (
        <Successful onPress={onPressBackArrow} />
      ) : (
        <Container
          withInput
          imageBackground="none"
          isHeaderVisible
          isHeaderTransparent
          isScrollable
          keyboardShouldPersistTaps="always"
          goBackNavigate={onPressBackArrow}
        >
          <Box
            flex={1}
            mt="spacing-xxs"
            mx="spacing-m"
            justifyContent={isKeyboardVisible ? 'flex-end' : 'space-between'}
          >
            <Form
              initialValues={{
                type: 'SMS',
                email: '',
                dni: '',
                name: '',
                lastName: '',
                phone: '',
              }}
              onSubmit={onPressContinue}
              enableReinitialize
              validateOnMount
              validateOnBlur
              validateOnChange
            >
              {({
                values, handleSubmit, isValid, setFieldValue, handleBlur, errors, handleChange,
              }) => (
                <>
                  <Box>
                    <Text variant="Heading20Medium">
                      {i18n.t('supports.head')}
                    </Text>
                    <Box mt="spacing-m" />
                    <TextInput
                      label={i18n.t('supports.label-email')}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      placeholder={i18n.t('supports.placeholder-email')}
                      maxLength={INPUT_MAX_LENGTH_EMAIL}
                      onChangeText={(value) => { setFieldValue?.('email', value.replace(RegexReplaceEmail, '')); }}
                      autoCapitalize="none"
                      keyboardType={Platform.OS === 'android' ? 'visible-password' : 'email-address'}
                      testID="emailInput"
                      error={errors.email}
                      textHelper={i18n.t('supports.errorMessage')}
                      containerProps={{ marginBottom: 'spacing-s' }}
                    />
                    <Box mt="spacing-xxs" />
                    <TextInput
                      label={i18n.t('supports.label-dni')}
                      value={values.dni}
                      placeholder={i18n.t('supports.placeholder-dni')}
                      onBlur={handleBlur('dni')}
                      onChangeText={(value) => { setFieldValue?.('dni', value.replace(RegexReplaceDni, '')); }}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      maxLength={DOCUMENT_NUMBER_LENGHT}
                      testID="dniInput"
                      error={errors.dni}
                      textHelper={i18n.t('supports.errorMessage')}
                      containerProps={{ marginBottom: 'spacing-s' }}
                    />
                    <Box mt="spacing-xxs" />
                    <TextInput
                      label={i18n.t('supports.label-name')}
                      value={values.name}
                      placeholder={i18n.t('supports.placeholder-name')}
                      maxLength={INPUT_MAX_LENGTH}
                      onBlur={handleBlur('name')}
                      onChangeText={handleChange('name')}
                      autoCapitalize="none"
                      keyboardType="default"
                      testID="nameInput"
                      error={errors.name}
                      textHelper={i18n.t('supports.errorMessage')}
                      containerProps={{ marginBottom: 'spacing-s' }}
                    />
                    <Box mt="spacing-xxs" />
                    <TextInput
                      label={i18n.t('supports.label-last-name')}
                      value={values.lastName}
                      placeholder={i18n.t('supports.placeholder-last-name')}
                      maxLength={INPUT_MAX_LENGTH}
                      onBlur={handleBlur('lastname')}
                      onChangeText={handleChange('lastname')}
                      autoCapitalize="none"
                      keyboardType="default"
                      testID="lastNameInput"
                      error={errors?.lastName}
                      textHelper={i18n.t('supports.errorMessage')}
                      containerProps={{ marginBottom: 'spacing-s' }}
                    />
                    <Box mt="spacing-xxs" />
                    <TextInput
                      label={i18n.t('supports.label-phone')}
                      value={values.phone}
                      placeholder={i18n.t('supports.placeholder-phone')}
                      maxLength={PHONE_NUMBER_LENGHT}
                      onBlur={handleBlur('phone')}
                      onChangeText={handleChange('phone')}
                      autoCapitalize="none"
                      keyboardType="numeric"
                      testID="phoneInput"
                      error={errors.phone}
                      textHelper={i18n.t('supports.errorMessage')}
                      containerProps={{ marginBottom: 'spacing-s' }}
                    />
                    <Box mt="spacing-xxs" />
                    <Text variant="body14Regular">
                      <Text variant="link" onPress={onPrivacyPress}>
                        {i18n.t('supports.policy-privacy')}
                      </Text>
                    </Text>
                  </Box>
                  <Box mb="spacing-s">
                    <Button
                      variant={isValid && statusButton ? 'primary' : 'disabled'}
                      label={i18n.t('supports.button-send')}
                      onPress={handleSubmit}
                      disabled={!isValid && statusButton}
                      testID="SubmitButton"
                    />
                  </Box>
                </>
              )}
            </Form>
          </Box>
        </Container>
      )}
      <ReCaptchaV3
        ref={reCaptchaRef}
        captchaDomain={GCP_RECAPTCHA_DOMAIN_NAME}
        siteKey={GCP_RECAPTCHA_KEY_ID}
        onReceiveToken={onReceiveReCaptchaToken}
        action={RECAPTCHA_ACTIONS.support}
      />
      <WarningModal closeInfoModal={closeModal} isLoadingReissues={isModalOpen} />
    </BackgroundWrapper>
  );
};

export default SupportHome;
