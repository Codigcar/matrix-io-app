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
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import { Form } from 'src/components/Form';
import { FIELD_ADDRESS_DELIVERY_MAX_LENGTH } from 'src/utils/constants';
import { LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useLocationForm from '../hooks/useLocationForm';

export const LocationFormScreen = (props: NavigationPropsType) => {
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
          title: i18n.t('request-card.locationForm.title'),
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
                  {i18n.t('request-card.locationForm.description')}
                </Text>
                <Text variant="Subtitle20SemiBold" mt="spacing-m" mb="spacing-xxs">
                  {i18n.t('request-card.locationForm.subtitle')}
                </Text>
                <Box>
                  <Box mt="spacing-xxs">
                    <Dropdown
                      isLoading={loadings.loadingDepartment}
                      labelKey="description"
                      label={i18n.t('request-card.locationForm.department-label')}
                      placeholder={i18n.t('request-card.locationForm.department-placeholder')}
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
                      placeholder={i18n.t('request-card.locationForm.province-placeholder')}
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
                      placeholder={i18n.t('request-card.locationForm.district-placeholder')}
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
                </Box>
              </Box>
              <Button
                mt="spacing-s"
                variant={isValid && !isSubmitting ? 'primary' : 'disabled'}
                onPress={handleSubmit}
                label={i18n.t('request-card.locationForm.submit')}
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
