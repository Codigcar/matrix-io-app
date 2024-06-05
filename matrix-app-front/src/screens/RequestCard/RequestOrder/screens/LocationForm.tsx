import React from 'react';
import {
  Container,
  Text,
  Box,
  Button,
  rebrandingTheme,
  Dropdown,
  TextInput,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { NavigationPropsType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import { Form } from 'src/components/Form';
import { FIELD_ADDRESS_DELIVERY_MAX_LENGTH } from 'src/utils/constants';
import { LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useLocationForm from '../hooks/useLocationForm';
import { string } from '../../shared/strings/string';

export const LocationFormScreen: React.FC<NavigationPropsType> = (props) => {
  const {
    onSubmit,
    goBack,
    departments,
    provinces,
    districts,
    selectDepartment,
    selectProvince,
    loadings,
    isLoading,
  } = useLocationForm(props);

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        withInput
        isScrollable
        isHeaderVisible
        goBackNavigate={goBack}
        imageBackground={BackgroundNew}
        headerProps={{
          title: string.requestCardLocationFormTitle,
          textAlign: 'left',
        }}
      >
        <Form
          initialValues={{
            department: null,
            province: null,
            district: null,
            addressDelivery: '',
            addressReference: '',
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
            errors,
            handleBlur,
          }) => (
            <Box flex={1} mx="spacing-m" pb="spacing-s" justifyContent="space-between">
              <Box>
                <Text variant="body14Regular" mt="spacing-xxs">
                  {string.requestCardLocationFormDescription}
                </Text>
                <Text variant="Subtitle20SemiBold" mt="spacing-m" mb="spacing-xxs">
                  {string.requestCardLocationFormSubtitle}
                </Text>
                <Box>
                  <Box mt="spacing-xxs">
                    <Dropdown
                      isLoading={loadings.loadingDepartment}
                      labelKey="description"
                      label={string.requestCardLocationFormDepartmentLabel}
                      placeholder={string.requestCardLocationFormDepartmentPlaceholder}
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
                      placeholder={string.requestCardLocationFormProvincePlaceholder}
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
                      placeholder={string.requestCardLocationFormDistrictPlaceholder}
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
                </Box>
              </Box>
              <Button
                mt="spacing-s"
                variant={isValid && !isSubmitting ? 'primary' : 'disabled'}
                onPress={handleSubmit}
                label={string.requestCardLocationFormSubmit}
                disabled={!isValid || isSubmitting}
              />
            </Box>
          )}
        </Form>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </Container>
    </ThemeProvider>
  );
};
export default LocationFormScreen;
