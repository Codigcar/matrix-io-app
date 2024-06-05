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
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
import MtxButton from 'libs/ui-toolkit/components/mtx-button/MtxButton';
// Utils
import { DEFAULT_SPACE_SECOND, INPUT_MAX_LENGTH_ALIAS } from 'src/utils/constants';
import { getString } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
// Styles
import styles from './styles/MtxAliasStyles';
// Hooks
import useAlias from './hooks/useAlias';

const MtxAlias = (props: NavigationPropsType) => {
  const {
    control, errors, isValid, onPressBackArrow, handleSubmit, onSubmit,
  } = useAlias(props);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.mainContainer}
      >
        <MtxWrapper isDark={false}>
          <View style={styles.formContainer}>
            <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
            <MtxLeftArrowIcon onPress={onPressBackArrow} dark />
            <View style={styles.secondaryContainer}>
              <MtxText style={styles.titleSemiBold}>{getString('alias-title')}</MtxText>
              <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
              <MtxInput
                label={getString('alias-label')}
                name="alias"
                control={control}
                rules={{
                  required: getString('alias-error-message'),
                }}
                error={errors.alias}
                placeholder={getString('alias-placeholder')}
                maxLength={INPUT_MAX_LENGTH_ALIAS}
                testID="aliasInput"
                autoFocus
              />
              <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
              <MtxButton
                label={getString('alias-label-submit')}
                onPress={handleSubmit(onSubmit)}
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

export default MtxAlias;
