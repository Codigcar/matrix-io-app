/* eslint-disable import/no-relative-packages */
/* eslint-disable react-native/no-raw-text */
import React from 'react';
// Components
import {
  KeyboardAvoidingView, SafeAreaView, ScrollView, Platform, View,
} from 'react-native';
import { Divider } from 'native-base';
import MtxWrapper from 'src/utils/core/Wrapper/MtxWrapper';
import MtxLeftArrowIcon from 'src/components/LeftArrowIcon/MtxLeftArrowIcon';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import MtxDropdown from 'libs/ui-toolkit/components/mtx-dropdown/MtxDropdown';
import MtxInput from 'libs/ui-toolkit/components/mtx-input/MtxInput';
import MtxCheckBox from 'libs/ui-toolkit/components/mtx-check-box/MtxCheckBox';
import MtxButton from 'libs/ui-toolkit/components/mtx-button/MtxButton';
// Utils
import {
  DEFAULT_SPACE,
  DEFAULT_SPACE_SECOND,
  DEFAULT_SPACE_FOURTH,
  DEFAULT_SPACE_SIX,
  INPUT_MAX_LENGTH,
} from 'src/utils/constants';
import { getString } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from '../../../types/types';
// Styles
import styles from './styles/MtxNewAddressStyle';
// Hooks
import useNewAddress from './hooks/useNewAddress';

const departmentList = ['Lima', 'San Isidro', 'Miraflores'];

const MtxNewAddress = (props: NavigationPropsType) => {
  const {
    control,
    errors,
    isValid,
    onPressBackArrow,
    watch,
    handleSubmit,
    onSubmit,
    cities,
    provinces,
    districts,
    selectCity,
    selectProvince,
    selectDistrict,
  } = useNewAddress(props);
  const watchCheckbox = watch('dataConfirmation');

  return (
    <SafeAreaView style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}
      >
        <MtxWrapper isDark={false}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
            <MtxLeftArrowIcon dark onPress={onPressBackArrow} />
            <Divider my={DEFAULT_SPACE_SECOND} thickness={0} />
            <MtxText style={styles.titleSemiBold}>{getString('address-title')}</MtxText>
            <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
            <View style={styles.addressContainer}>
              <MtxText style={styles.subTitle}>
                {getString('address-sub-title')}
              </MtxText>
              <Divider my={DEFAULT_SPACE_SIX} thickness={0} />
              <MtxDropdown
                label={getString('address-city-label')}
                itemList={cities}
                isDisabled={!watchCheckbox}
                labelKey="description"
                onChangeItem={selectCity}
              />
              <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
              <MtxDropdown
                label={getString('address-province-label')}
                itemList={provinces}
                isDisabled={!watchCheckbox}
                labelKey="description"
                onChangeItem={selectProvince}
              />
              <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
              <MtxDropdown
                label={getString('address-district-label')}
                itemList={districts}
                isDisabled={!watchCheckbox}
                labelKey="description"
                onChangeItem={selectDistrict}
              />
              <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
              <MtxInput
                label={getString('address-name-label')}
                name="address"
                control={control}
                rules={{
                  required: true,
                }}
                error={errors.address}
                placeholder={getString('address-name-label')}
                maxLength={INPUT_MAX_LENGTH}
                testID="addressInput"
              />
            </View>
            <Divider my={DEFAULT_SPACE} thickness={0} />
            <MtxCheckBox
              name="dataConfirmation"
              control={control}
              rules={{
                required: 'Campo obligatorio',
              }}
            >
              <MtxText style={styles.checkboxLabel}>
                {getString('address-checkbox')}
              </MtxText>
            </MtxCheckBox>
            <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
            <MtxButton
              label={getString('alias-label-submit')}
              onPress={handleSubmit(onSubmit)}
              isDisabled={!isValid}
              testID="SubmitButton"
            />
            <Divider my={DEFAULT_SPACE_FOURTH} thickness={0} />
          </ScrollView>
        </MtxWrapper>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MtxNewAddress;
