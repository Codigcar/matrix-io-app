import React from 'react';
// Components
import { Form } from 'src/components/Form';
import { Box, Button, Container, Text, TextInput, rebrandingTheme } from 'matrix-ui-components';
// Utils
import useKeyboard from 'src/utils/hooks/useKeyboard';
import { i18n } from 'src/utils/core/MTXStrings';
import { RegexPhoneNumberPeru } from 'src/utils/regex/InputValidator';
import { PHONE_NUMBER_LENGHT } from 'src/utils/constants';
import { NavigationPropsType } from '../../../../types/types';
import useNewPhone from './hooks/useNewPhone';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { RFValue } from 'react-native-responsive-fontsize';

const NewPhone = (props: NavigationPropsType) => {
  const { isKeyboardVisible } = useKeyboard();
  const {
    maskValue,
    errors,
    onPressBackArrow,
    submitPhone,
    phoneLenghtRule,
    isButtonEnabled,
    checkValidations,
    setValue,
  } = useNewPhone(props);

  return (
      <BackgroundWrapper>
      <Container
              withInput
              imageBackground="none"
              hasGradient={false}
              keyboardShouldPersistTaps="always"
              isHeaderTransparent
              isHeaderVisible
              isScrollable
          goBackNavigate={onPressBackArrow}
        >
          <Form
            initialValues={{
              phoneNumber: '',
            }}
            onSubmit={submitPhone}
            validateOnMount
          >
            {({ handleSubmit, values, isValid, setFieldValue, isSubmitting }) => (
          <Box flex={1} mx="spacing-m" mt="spacing-xl" justifyContent="space-between">
              <Box>
                <Box maxWidth={RFValue(194)} mb="spacing-xxm">
                  <Text variant="Heading20Medium">{i18n.t('new-phone-title')}</Text>
                </Box>
                <TextInput
                  label={i18n.t('phone-label')}
                  name="phone"
                  keyboardType="phone-pad"
                  error={errors.phone}
                  textHelper={errors.phone?.message}
                  testID="phone"
                  onChangeText={(value) => {
                    const regexNumberPhone = /^[0-9]{1,9}$/;
                    if (value === '' || regexNumberPhone.test(value)) {
                      setFieldValue?.('phone', value);
                      setValue('phone', value);
                      checkValidations(value);
                    } else {
                      setFieldValue?.('phone', values.phone && value ? values.phone : '');
                    }
                  }}
                  placeholder="000 000 000"
                  maxLength={PHONE_NUMBER_LENGHT + 2}
                  value={values.phone}
                  autoFocus
                  leftIcon={{ name: 'flagPe', width: 20, height: 20, prefix: '+51' }}
                />
                </Box>
                <Button
                  label="Continuar"
                  variant={isButtonEnabled ? 'primary' : 'disabled'}
                  onPress={handleSubmit}
                  disabled={!isButtonEnabled}
                  my="spacing-m"
                />
              </Box>
            )}
          </Form>
        </Container>
        </BackgroundWrapper>
  );
};
export default NewPhone;
