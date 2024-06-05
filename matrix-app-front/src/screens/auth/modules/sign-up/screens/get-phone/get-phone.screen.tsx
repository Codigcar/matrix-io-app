import React from 'react';
import {
  Container, Box, Button, Text, TextInput,
} from 'matrix-ui-components';
import { PHONE_NUMBER_LENGHT, PREFIX_NUMBER } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { Form } from 'src/components/Form';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RFValue } from 'react-native-responsive-fontsize';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import ReCaptchaModalError from 'src/screens/auth/components/AuthModalError';
import { getNumbersLetters, maskPhoneText } from 'src/utils/text';
import useGetPhonePresenter from './get-phone.presenter';
import ReferralCode from './components/referralCode/referralCode';
import { GetPhoneSchema } from './get-phone.definitions';

const GetPhoneScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.GET_PHONE>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const { onPressContinue, onPressBackArrow, enableReferralCode } = useGetPhonePresenter(props);

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
          validateOnMount
          onSubmit={onPressContinue}
          validationSchema={GetPhoneSchema}
        >
          {({
            values, handleSubmit, handleChange, errors, isValid, isSubmitting,
          }) => (
            <Box flex={1} m="spacing-m" mt="spacing-none">
              <Box flex={1} justifyContent="flex-start">
                <Box mb="spacing-s" maxWidth={RFValue(190)}>
                  <Text variant="Heading20Medium">
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
                  testID="phoneInput"
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
                onPress={() => handleSubmit()}
                disabled={!isValid || isSubmitting}
                testID="SubmitButton"
                mt="spacing-xm"
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
