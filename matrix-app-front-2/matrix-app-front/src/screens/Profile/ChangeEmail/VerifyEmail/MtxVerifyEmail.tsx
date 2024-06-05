/* eslint-disable import/no-relative-packages */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
// Components
import {
  KeyboardAvoidingView, SafeAreaView, Platform, View,
} from 'react-native';
import { Divider } from 'native-base';
import MtxWrapper from 'src/utils/core/Wrapper/MtxWrapper';
import MtxLeftArrowIcon from 'src/components/LeftArrowIcon/MtxLeftArrowIcon';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxButton from 'libs/ui-toolkit/components/mtx-button/MtxButton';
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
// Utils
import { DEFAULT_SPACE_SECOND, INPUT_MAX_LENGTH } from 'src/utils/constants';
import { getString } from 'src/utils/core/MTXStrings';
import { RegexEmail } from 'src/utils/regex/InputValidator';
import { NavigationPropsType } from '../../../../types/types';
// Styles
import styles from './styles/MtxVerifyEmailStyles';
// Hooks
import useVerifyEmail from './hooks/useVerifyEmail';

const MtxVerifyEmail = (props: NavigationPropsType) => {
  const {
    control,
    errors,
    isValid,
    onPressBackArrow,
    handleSubmit,
    verifyEmail,
    verifyError,
    feedbackMessage,
  } = useVerifyEmail(props);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.mainContainer}
      >
        <MtxWrapper isDark={false}>
          <View style={styles.formContainer}>
            <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
            <MtxLeftArrowIcon dark onPress={onPressBackArrow} />
            <View style={styles.secondaryContainer}>
              <MtxText style={styles.titleSemiBold}>{getString('email-title')}</MtxText>
              <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
              <MtxInput
                label={getString('email-label')}
                keyboardType={Platform.OS === 'android' ? 'visible-password' : 'email-address'}
                name="email"
                control={control}
                rules={{
                  required: getString('email-error-message'),
                  validate: { value: () => verifyError() || getString('email-error-coincidence') },
                  pattern: {
                    value: RegexEmail,
                    message: getString('email-error-invalid'),
                  },
                }}
                error={errors.email}
                bottomLabel={feedbackMessage}
                placeholder={getString('email-placeholder')}
                maxLength={INPUT_MAX_LENGTH}
                testID="emailInput"
                autoFocus
              />
              <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
              <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
              <MtxButton
                label={getString('email-label-submit')}
                onPress={handleSubmit(verifyEmail)}
                isDisabled={!isValid}
                testID="SubmitButton"
              />
            </View>
          </View>
        </MtxWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default MtxVerifyEmail;
