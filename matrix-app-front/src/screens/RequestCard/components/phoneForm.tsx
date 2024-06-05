import React from 'react';
import { Form } from 'src/components/Form';
import {
  Box, Button, TextInput, rebrandingTheme,
} from 'matrix-ui-components';
import { PHONE_NUMBER_LENGHT } from 'src/utils/constants';
import { RegexPhoneNumber } from 'src/utils/regex/InputValidator';
import { ThemeProvider } from '@shopify/restyle';
import { string } from '../shared/strings/string';
import { PhoneFormProps } from '../shared/types/components';

const maskValue = (value: string): string =>
  value
    .replace(/ /g, '')
    .slice(0, PHONE_NUMBER_LENGHT)
    .split('')
    .map((char, index) => {
      if (index === 2 || index === 5) {
        return `${char} `;
      }
      return char;
    })
    .join('')
    .trim();

const PhoneForm: React.FC<PhoneFormProps> = (props) => {
  const { onSubmit, phoneNumber } = props;
  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Form
        initialValues={{
          phoneNumber,
        }}
        onSubmit={onSubmit}
        validateOnMount
      >
        {({
          handleSubmit, values, isValid, setFieldValue, isSubmitting,
        }) => (
          <Box justifyContent="flex-end" mt="spacing-s">
            <Box my="spacing-m">
              <TextInput
                label={string.requestCardPhoneFormLabel}
                name="phone"
                keyboardType="phone-pad"
                onChangeText={(value) =>
                  setFieldValue?.('phoneNumber', maskValue(value.replace(RegexPhoneNumber, '')))}
                placeholder={string.requestCardPhoneFormPlaceholder}
                maxLength={PHONE_NUMBER_LENGHT + 2}
                value={values.phoneNumber}
                autoFocus
                leftIcon={{
                  name: 'flagPe',
                  width: 20,
                  height: 20,
                  prefix: '+51',
                }}
              />
            </Box>
            <Button
              variant={isValid && !isSubmitting && values.phoneNumber ? 'primary' : 'disabled'}
              mt="spacing-m"
              onPress={handleSubmit}
              label={string.requestCardUseFormSubmitModal}
              disabled={!isValid || isSubmitting || !values.phoneNumber}
            />
          </Box>
        )}
      </Form>
    </ThemeProvider>
  );
};

export default PhoneForm;
