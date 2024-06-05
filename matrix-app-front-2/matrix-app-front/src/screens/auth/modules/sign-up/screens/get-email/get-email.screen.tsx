import React, { useEffect } from 'react';
import {
  Container, Box, Button, Text, CheckBox, TextInput,
} from 'matrix-ui-components';
import { analyticsManagerProvider, AnalyticsProviderType, AFLoggerEvents } from 'src/shared/providers/analytics/index';
import { INPUT_MAX_LENGTH_EMAIL, android } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { Form } from 'src/components/Form';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import useGetEmailPresenter from './get-email.presenter';

const GetEmailScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.GET_EMAIL>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const { onPressContinue, onPressBackArrow, onLinkPress } = useGetEmailPresenter(props);

  useEffect(() => {
    analyticsManagerProvider.logEventWithType({
      valor: 'crear cuenta',
    }, AnalyticsProviderType.appsFlyer, AFLoggerEvents.createAccountLoaded);
  }, []);

  return (
    <BackgroundWrapper>
      <Form
        initialValues={{
          email: '',
          emailConfirm: '',
          dataProtectionClause: false,
        }}
        validateOnMount
        onSubmit={onPressContinue}
      >
        {({
          values, handleChange, setFieldValue, handleBlur, handleSubmit, isValid, errors,
        }) => (
          <Container
            withInput
            imageBackground="none"
            hasGradient={false}
            isHeaderVisible
            isHeaderTransparent
            showHeaderBackground={isValid}
            headerProps={{
              title: isValid ? i18n.t('enrollment-titles-enter-your-email') : undefined,
              textAlign: 'left',
            }}
            isScrollable
            keyboardShouldPersistTaps="handled"
            goBackNavigate={onPressBackArrow}
          >
            <Box flex={1} m="spacing-m" mt="spacing-none" justifyContent="space-between">
              <Box>
                {!isValid ? (
                  <Text mt="spacing-xxs" variant="Heading20Medium">
                    {i18n.t('enrollment-titles-enter-your-email-2')}
                  </Text>
                ) : null}
                <Box mt="spacing-s" />
                <TextInput
                  label={i18n.t('enrollment-input-enter-your-email')}
                  placeholder={i18n.t('enrollment.email-placeholder')}
                  maxLength={INPUT_MAX_LENGTH_EMAIL}
                  autoCapitalize="none"
                  autoFocus
                  keyboardType={android ? 'visible-password' : 'email-address'}
                  value={values.email}
                  textHelper={errors.email}
                  error={!!errors.email}
                  contextMenuHidden
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  testID="emailInput"
                />

                <Box mt="spacing-m" mb="spacing-xxxxxs" />

                <TextInput
                  label={i18n.t('enrollment-email-confirm-label')}
                  placeholder={i18n.t('enrollment.email-placeholder')}
                  maxLength={INPUT_MAX_LENGTH_EMAIL}
                  autoCapitalize="none"
                  keyboardType={android ? 'visible-password' : 'email-address'}
                  showTextHelper
                  value={values.emailConfirm}
                  textHelper={errors.emailConfirm ? errors.emailConfirm : i18n.t('enrollment-email-confirm-validation')}
                  error={!!errors.emailConfirm}
                  contextMenuHidden
                  onChangeText={handleChange('emailConfirm')}
                  onBlur={handleBlur('emailConfirm')}
                  testID="emailConfirmInput"
                />
                <Box mt="spacing-xm" />
                <Text variant="body14Regular">
                  {i18n.t('enrollment-titles-accept-terms-and-conditions_1')}
                  <Text variant="Link14MediumBlue" onPress={() => onLinkPress('terms')}>
                    {i18n.t('enrollment-titles-accept-terms-and-conditions_2')}
                  </Text>
                </Text>
                <CheckBox
                  testID="btn-privacy"
                  onPress={() => (
                    setFieldValue?.('dataProtectionClause', !values.dataProtectionClause)
                  )}
                  isCheck={values.dataProtectionClause}
                  mt="spacing-xs"
                  mr="spacing-sm"
                  alignItems="flex-start"
                  analytics={{
                    valor: i18n.t('card-offer-terms-conditions-first-text') + i18n.t('enrollment-titles-accept-policy_1'),
                  }}
                >
                  <Text textAlign="left" variant="label">
                    <Text textAlign="left" variant="body14Regular">
                      {i18n.t('card-offer-terms-conditions-first-text')}
                      <Text variant="Link14MediumBlue" onPress={() => onLinkPress('privacy')}>
                        {i18n.t('enrollment-titles-accept-policy_1')}
                      </Text>
                    </Text>
                  </Text>
                </CheckBox>
              </Box>
              <Button
                variant={isValid ? 'primary' : 'disabled'}
                label={i18n.t('enrollment.label-submit')}
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

export default GetEmailScreen;
