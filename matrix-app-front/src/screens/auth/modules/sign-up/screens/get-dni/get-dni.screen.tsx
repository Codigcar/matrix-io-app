import React from 'react';
import {
  Container, Box, Button, Text, TextInput,
} from 'matrix-ui-components';
import { DOCUMENT_NUMBER_LENGHT } from 'src/utils/constants';
import { RegexReplaceDni } from 'src/utils/regex/InputValidator';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { Form } from 'src/components/Form';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignUpRoutesEnum } from 'src/shared/enums/routes/signup-routes.enum';
import useGetDniPresenter from './get-dni.presenter';

const GetDniScreen: React.FC<
CompositeScreenProps<
  NativeStackScreenProps<ReactNavigation.AuthNavigator, SignUpRoutesEnum.GET_DNI>,
  NativeStackScreenProps<ReactNavigation.RootStackParamList>
>> = (props) => {
  const { onPressContinue, onPressBackArrow } = useGetDniPresenter(props);

  return (
    <BackgroundWrapper>
      <Form
        initialValues={{
          dni: '',
        }}
        validateOnMount
        onSubmit={onPressContinue}
      >
        {({
          values, handleChange, handleBlur, handleSubmit, isValid,
        }) => (
          <Container
            withInput
            imageBackground="none"
            hasGradient={false}
            isHeaderVisible
            isHeaderTransparent
            isScrollable
            keyboardShouldPersistTaps="always"
            goBackNavigate={onPressBackArrow}
          >
            <Box flex={1} m="spacing-m" mt="spacing-none">
              <Box flex={1} justifyContent="flex-end">
                <Text variant="Heading20Medium">
                  {i18n.t('enrollment-titles-enter-your-dni-2')}
                </Text>
                <Box mt="spacing-s" />
                <TextInput
                  label={i18n.t('enrollment-input-enter-your-dni-fullname')}
                  placeholder={i18n.t('enrollment.placeholder-dni')}
                  keyboardType="numeric"
                  value={values.dni}
                  autoFocus
                  disableCopyPaste
                  onChangeText={(e) => handleChange('dni')(e.replace(RegexReplaceDni, ''))}
                  onBlur={handleBlur('dni')}
                  maxLength={DOCUMENT_NUMBER_LENGHT}
                  testID="dniInput"
                />
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

export default GetDniScreen;
