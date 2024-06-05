import React from 'react';
import {
  Container, Box, Text, Button, TextInput,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { INPUT_MAX_LENGTH, NEW_PASSWORD_REQUIREMENTS } from 'src/utils/constants';
import { Form } from 'src/components/Form';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'src/utils/sizes';
import { TickCircle, TickCircleUncheck } from 'assets/svgs';
import usePasswordPresenter from './new-password.presenter';

export const NewPasswordScreen: React.FC<
  CompositeScreenProps<
    NativeStackScreenProps<ReactNavigation.AuthNavigator, 'PasswordVerification'>,
    NativeStackScreenProps<ReactNavigation.RootStackParamList>
  >
> = (props) => {
  const {
    checkOptions,
    onPressContinue,
    onPressBackArrow,
  } = usePasswordPresenter(props);

  return (
    <BackgroundWrapper>
      <Form
        initialValues={{
          password: '',
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
            goBackNavigate={onPressBackArrow}
            isHeaderTransparent
            keyboardShouldPersistTaps="handled"
            isHeaderVisible
            isScrollable
          >
            <Box flex={1} m="spacing-m" mt="spacing-none" justifyContent="space-between">
              <Box flex={1}>
                <Text variant="Heading20SemiBold">
                  {i18n.t('password-confirmation-titles-great')}
                  <Text variant="Heading20Regular">
                    {i18n.t('password-confirmation-titles-great-now')}
                  </Text>
                </Text>
                <Text variant="Heading20Regular">
                  {i18n.t('password-confirmation-titles-create-password')}
                </Text>

                <Box mt="spacing-m" />
                <TextInput
                  containerProps={{ marginBottom: 'spacing-s' }}
                  label={i18n.t('password-repeat-input-password')}
                  placeholder={i18n.t('password-confirmation-titles-input-password')}
                  value={values.password}
                  secureTextEntry
                  contextMenuHidden
                  maxLength={INPUT_MAX_LENGTH}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  autoFocus
                  testID="password"
                />

                <Box mt="spacing-s">
                  {NEW_PASSWORD_REQUIREMENTS.map((validation, index) => (
                    <Box
                      key={validation}
                      flexDirection="row"
                      alignItems="center"
                      mt={index > 0 ? 'spacing-xxs' : 'spacing-none'}
                    >
                      {checkOptions(validation, values.password) ? (
                        <TickCircle width={s(24)} height={s(24)} />
                      ) : (
                        <TickCircleUncheck width={s(24)} height={s(24)} />
                      )}
                      <Box ml="spacing-xxs" flex={1}>
                        <Text variant="body13Regular">
                          {i18n.t(`forgotPassword.newPassword.${validation}`)}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Button
                label={i18n.t('password-confirmation-buttons-continue')}
                variant={isValid ? 'primary' : 'disabled'}
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

export default NewPasswordScreen;
