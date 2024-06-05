import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Container, Box, Button, Text, TextInput } from 'matrix-ui-components';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { i18n } from 'src/utils/core/MTXStrings';
import { PREFIX_NUMBER, PHONE_NUMBER_LENGHT } from 'src/utils/constants';
import { Form } from 'src/components/Form';
import { getNumbersLetters, maskPhoneText } from 'src/utils/text';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import ReferralCode from '../components/referralCode/referralCode';
import useGetPhonePresenter from './get-phone.presenter';
import { GetPhoneSchema } from './get-phone.definitions';

const GetPhoneScreen = () => {
  const { onPressContinue, onPressBackArrow, enableReferralCode } = useGetPhonePresenter();

  return (
    <BackgroundWrapper>
      <Container
        withInput
        imageBackground="none"
        hasGradient={false}
        keyboardShouldPersistTaps="handled"
        isHeaderTransparent
        isHeaderVisible
        isScrollable
        goBackNavigate={onPressBackArrow}
      >
        <Form
          initialValues={{
            phone: '',
            referralCode: '',
          }}
          onSubmit={onPressContinue}
          validateOnMount
          validationSchema={GetPhoneSchema}
        >
          {({ values, handleSubmit, handleChange, errors, isValid, isSubmitting }) => (
            <Box flex={1} mx="spacing-m" justifyContent="space-between">
              <Box>
                <Box maxWidth={RFValue(194)} mb="spacing-s">
                  <Text variant="Heading20Medium" lineHeight={RFValue(24)}>
                    {i18n.t('enrollment-titles-enter-your-phone')}
                  </Text>
                </Box>
                <TextInput
                  label={i18n.t('phone-label')}
                  placeholder="000 000 000"
                  maxLength={PHONE_NUMBER_LENGHT + 2}
                  keyboardType="phone-pad"
                  value={values.phone}
                  leftIcon={{
                    name: 'flagPe',
                    width: 16,
                    height: 16,
                    prefix: `+${PREFIX_NUMBER}`,
                  }}
                  error={!!errors.phone}
                  textHelper={errors.phone}
                  onChangeText={(e) => handleChange('phone')(maskPhoneText(e))}
                  disabled={isSubmitting}
                />
                {enableReferralCode ? (
                  <ReferralCode
                    disabled={isSubmitting}
                    value={values.referralCode}
                    error={errors.referralCode}
                    onChangeText={(e) => handleChange('referralCode')(getNumbersLetters(e))}
                  />
                ) : null}
              </Box>
              <Button
                label="Continuar"
                variant={!isValid || isSubmitting ? 'disabled' : 'primary'}
                onPress={handleSubmit as unknown as (e: GestureResponderEvent) => void}
                disabled={!isValid}
                my="spacing-m"
              />
            </Box>
          )}
        </Form>
        <ReCaptchaModalError />
      </Container>
    </BackgroundWrapper>
  );
};

export default GetPhoneScreen;
