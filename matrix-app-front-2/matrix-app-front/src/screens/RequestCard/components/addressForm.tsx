import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'src/components/Form';
import {
  Box, Button, TextInput, Dropdown, rebrandingTheme,
} from 'matrix-ui-components';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { NavigationPropsType } from 'src/types/types';
import { Keyboard, ScrollView } from 'react-native';
import { FIELD_ADDRESS_DELIVERY_MAX_LENGTH, screenHeight } from 'src/utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { Address, AddressFormValues, LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import useLocationForm from '../RequestOrder/hooks/useLocationForm';

interface Props {
  addressEdit: Address;
  onSubmit: (values: AddressFormValues) => void;
  props: NavigationPropsType;
}

const AddressForm = ({ onSubmit, addressEdit, props }: Props) => {
  const {
    departments,
    provinces,
    districts,
    selectDepartment,
    selectProvince,
    loadings,
  } = useLocationForm(props);

  useEffect(() => {
    if (addressEdit.department && addressEdit.province && addressEdit.district) {
      if (!provinces.length) selectDepartment(addressEdit.department);
      if (!districts.length) {
        selectProvince(addressEdit.province);
      }
    }
  }, []);

  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false);

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
      scrollToBottom();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Box maxHeight={!keyboardOpen ? '100%' : screenHeight - RFValue(screenHeight / 2)}>
        <ScrollView ref={scrollViewRef}>
          <Form
            initialValues={{
              department: addressEdit.department || null,
              province: addressEdit.province || null,
              district: addressEdit.district || null,
              addressDelivery: addressEdit.address,
              addressReference: addressEdit.reference,
            }}
            onSubmit={onSubmit}
            validateOnMount
          >
            {({
              handleSubmit,
              values,
              isValid,
              handleChange,
              setFieldValue,
              isSubmitting,
              handleBlur,
              errors,
            }) => (
              <Box justifyContent="flex-end" mt="spacing-xxxs">
                <Box mt="spacing-xxs">
                  <Dropdown
                    isLoading={loadings.loadingDepartment}
                    labelKey="description"
                    label={i18n.t('request-card.locationForm.department-label')}
                    itemList={departments}
                    onChangeItem={(item: LocationProps) => {
                      setFieldValue?.('department', item);
                      setFieldValue?.('province', null);
                      setFieldValue?.('district', null);
                      selectDepartment(item);
                    }}
                    value={values.department}
                    disabledItem
                    disabledItemProp="enabled"
                    disabledItemValue={0}
                  />
                </Box>
                <Box mt="spacing-xs">
                  <Dropdown
                    isLoading={loadings.loadingProvince}
                    labelKey="description"
                    label={i18n.t('request-card.locationForm.province-label')}
                    itemList={provinces}
                    onChangeItem={(item: LocationProps) => {
                      setFieldValue?.('province', item);
                      setFieldValue?.('district', null);
                      selectProvince(item);
                    }}
                    value={values.province}
                    disabledItem
                    disabledItemProp="enabled"
                    disabledItemValue={0}
                  />
                </Box>
                <Box mt="spacing-xs">
                  <Dropdown
                    isLoading={loadings.loadingDistrict}
                    labelKey="description"
                    label={i18n.t('request-card.locationForm.district-label')}
                    itemList={districts}
                    onChangeItem={(item: LocationProps) => {
                      setFieldValue?.('district', item);
                    }}
                    value={values.district}
                    disabledItem
                    disabledItemProp="enabled"
                    disabledItemValue={0}
                  />
                </Box>
                <Box my="spacing-xs">
                  <TextInput
                    label={i18n.t('request-card.locationForm.address-label')}
                    placeholder={i18n.t('request-card.locationForm.address-placeholder')}
                    value={values.addressDelivery}
                    onChangeText={handleChange('addressDelivery')}
                    maxLength={FIELD_ADDRESS_DELIVERY_MAX_LENGTH}
                    error={!!errors?.addressDelivery}
                    onBlur={handleBlur('addressDelivery')}
                  />
                </Box>
                <TextInput
                  label={i18n.t('request-card.locationForm.reference-label')}
                  placeholder={i18n.t('request-card.locationForm.reference-placeholder')}
                  value={values.addressReference}
                  onChangeText={handleChange('addressReference')}
                  maxLength={FIELD_ADDRESS_DELIVERY_MAX_LENGTH}
                  error={!!errors?.addressReference}
                  onBlur={handleBlur('addressReference')}
                />
                <Button
                  variant={isValid && !isSubmitting ? 'primary' : 'disabled'}
                  mt="spacing-s"
                  onPress={handleSubmit}
                  label={i18n.t('request-card.userForm.submitModal')}
                  disabled={!isValid || isSubmitting}
                />
              </Box>
            )}
          </Form>
        </ScrollView>
      </Box>
    </ThemeProvider>
  );
};

export default AddressForm;
