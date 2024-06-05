/* eslint-disable import/no-relative-packages */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
// Components
import {
  View, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView,
} from 'react-native';
import { Divider } from 'native-base';
import { DEFAULT_SPACE_FOURTH, DEFAULT_SPACE_THIRD } from 'src/utils/constants';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxWrapper from 'src/utils/core/Wrapper/MtxWrapper';
import MtxLeftArrowIcon from 'src/components/LeftArrowIcon/MtxLeftArrowIcon';
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
import MtxButton from 'libs/ui-toolkit/components/mtx-button/MtxButton';
import TopSnackbar from 'src/components/TopSnackbar/TopSnackbar';
// Hooks
import { getString } from 'src/utils/core/MTXStrings';
import useMtxGetDNI from './hooks/useMtxGetDNI';
// Types
import { NavigationPropsType } from '../../../types/types';
// Styles
import styles from './styles/MtxGetDNIStyles';
import { RegexReplaceDni } from 'src/utils/regex/InputValidator';

const MTXGetDNI = (props: NavigationPropsType) => {
  const {
    onPressBackArrow,
    checkValidations,
    control,
    errors,
    setValue,
    isValid,
    minLenghtRule,
    handleSubmit,
    onPressSubmitButton,
    isExceededOTP,
  } = useMtxGetDNI(props);

  const feedbackMessage = isExceededOTP ? (
    <TopSnackbar iconName="errorCircle" label="Has alcanzado el máximo de intentos" />
  ) : null;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}
      >
        <MtxWrapper>
          <ScrollView style={styles.scrollContainer}>
            {feedbackMessage}
            <Divider my={DEFAULT_SPACE_THIRD} thickness={0} />
            <View style={styles.headerContainer}>
              <MtxLeftArrowIcon dark onPress={onPressBackArrow} />
            </View>
            <View style={styles.spaceContainer} />
            <View>
              <View style={styles.titleContainer}>
                <MtxText style={styles.titleLight}>
                  {getString('recoveryPassword-getDNI-title')}
                </MtxText>
                <MtxText style={styles.titleSemiBold}>
                  {getString('recoveryPassword-getDNI-password')}
                </MtxText>
              </View>
              <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
              <MtxInput
                label={getString('recoveryPassword-getDNI-input-label')}
                name="dni"
                keyboardType="decimal-pad"
                control={control}
                error={errors.dni}
                rules={{
                  required: 'Este campo es obligatorio',
                  minLength: minLenghtRule,
                  onChange: (v: any) => setValue('dni', v.target.value.replace(RegexReplaceDni, '')),
                }}
                placeholder={getString('recoveryPassword-getDNI-input-palceholder')}
                maxLength={8}
                testID="DniInput"
                autoFocus
              />
              <Divider my={DEFAULT_SPACE_THIRD} thickness={0} />
              <MtxButton
                label={getString('recoveryPassword-getDNI-button-text')}
                onPress={handleSubmit(onPressSubmitButton)}
                isDisabled={!isValid || isExceededOTP}
                testID="SubmitButton"
              />
              <Divider my={DEFAULT_SPACE_THIRD} thickness={0} />
            </View>
          </ScrollView>
        </MtxWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MTXGetDNI;
