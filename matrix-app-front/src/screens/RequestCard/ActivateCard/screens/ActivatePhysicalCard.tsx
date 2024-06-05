import React from 'react';
import {
  Box,
  Container,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingBox,
} from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { Form } from 'src/components/Form';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { RegexPhoneNumber } from 'src/utils/regex/InputValidator';
import { ios } from 'src/utils/constants';
import { ActivationCode } from 'assets/images';
import { RFValue } from 'react-native-responsive-fontsize';
import { Image } from 'react-native';
import useActivateCard from '../hooks/useActivateCard';
import { string } from '../../shared/strings/string';

export const ActivatePhysicalCard = (props: NavigationPropsType) => {
  const {
    isError, isLoading, maskValue, goBack, onSubmit,
  } = useActivateCard(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <BackgroundWrapper>
        <Container
          hasGradient={false}
          imageBackground="none"
          isHeaderVisible
          goBackNavigate={goBack}
        >
          <KeyboardAvoidingBox flex={1} behavior={undefined} keyboardVerticalOffset={ios ? 0 : 10}>
            <Box flex={1} width="100%" mt="spacing-s" px="spacing-m" justifyContent="flex-start">
              <Box flexShrink={2} width="100%" justifyContent="center" alignItems="center">
                <Box justifyContent="center" alignItems="center">
                  <Image
                    source={ActivationCode}
                    style={{ width: RFValue(160), height: RFValue(160) }}
                  />
                </Box>
              </Box>
              <Text variant="Heading20pxMedium" mb="spacing-s" mt="spacing-l" textAlign="center">
                {string.activateCardTitle}
              </Text>
              <Text variant="body14pxRegular" textAlign="center">
                {string.activateCardDescription}
              </Text>
              <Form
                initialValues={{
                  activationCode: '',
                }}
                onSubmit={onSubmit}
                validateOnChange
              >
                {({
                  handleSubmit, values, isValid, setFieldValue, isSubmitting,
                }) => (
                  <Box width="100%">
                    <TextInput
                      containerProps={{
                        marginBottom: 'spacing-s',
                      }}
                      textAlign="center"
                      letterSpacing={8}
                      value={values.activationCode}
                      keyboardType="numeric"
                      maxLength={17}
                      textHelper={string.activateCardInputError}
                      error={isError}
                      onChangeText={(value) => {
                        setFieldValue?.(
                          'activationCode',
                          maskValue(value.replace(RegexPhoneNumber, '')),
                        );
                      }}
                    />
                    <Button
                      variant={isValid ? 'primary' : 'disabled'}
                      mt="spacing-xs"
                      mb="spacing-s"
                      label={string.activateCardSubmit}
                      onPress={handleSubmit}
                      disabled={values.extraFunctions && !isValid}
                    />
                  </Box>
                )}
              </Form>
            </Box>
            <LoadingIndicator isVisible={isLoading} />
          </KeyboardAvoidingBox>
        </Container>
      </BackgroundWrapper>
    </ThemeProvider>
  );
};
export default ActivatePhysicalCard;