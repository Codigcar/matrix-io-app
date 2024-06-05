import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'src/components/Form';
import {
  Box, Button, TextInput, Dropdown, rebrandingTheme,
} from 'matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import { Keyboard, ScrollView } from 'react-native';
import { FIELD_ADDRESS_DELIVERY_MAX_LENGTH, screenHeight } from 'src/utils/constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import useLocationForm from '../RequestOrder/hooks/useLocationForm';
import { string } from '../shared/strings/string';
import { AddressFormProps } from '../shared/types/components';

const AddressForm: React.FC<AddressFormProps> = (props) => {
  const { onSubmit, addressEdit, props: defaultProps } = props;
  const {
    departments, provinces, districts, selectDepartment, selectProvince, loadings,
  } = useLocationForm(defaultProps);

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
                    label={string.requestCardLocationFormDepartmentLabel}
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
                    label={string.requestCardLocationFormProvinceLabel}
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
                    label={string.requestCardLocationFormDistrictLabel}
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
                    label={string.requestCardLocationFormAddressLabel}
                    placeholder={string.requestCardLocationFormAddressPlaceholder}
                    value={values.addressDelivery}
                    onChangeText={handleChange('addressDelivery')}
                    maxLength={FIELD_ADDRESS_DELIVERY_MAX_LENGTH}
                    error={!!errors?.addressDelivery}
                    onBlur={handleBlur('addressDelivery')}
                  />
                </Box>
                <TextInput
                  label={string.requestCardLocationFormReferenceLabel}
                  placeholder={string.requestCardLocationFormReferencePlaceholder}
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
                  label={string.requestCardUseFormSubmitModal}
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
