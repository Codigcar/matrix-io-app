import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Container, Box, Text, TextInput, CheckBox, Button, Dropdown,
} from 'matrix-ui-components';
import { Form } from 'src/components/Form';
import { i18n } from 'src/utils/core/MTXStrings';
import { UbigeoType } from 'src/utils/ubigeo/handlerUbigeo';
import { FIELD_ADDRESS_MAX_LENGTH } from 'src/utils/constants';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGetPersonalData from './hooks/useGetPersonalData';

const DEFAULT_NATIONALITY = 'Peruano';

const GetPersonalData: React.FC<NavigationPropsType> = (props) => {
  const {
    userFullName,
    documentNumber,
    location,
    cities,
    provinces,
    districts,
    selectDepartment,
    selectProvince,
    selectDistrict,
    onPressContinue,
  } = useGetPersonalData(props);
  const {
    state, province, district, address,
  } = location;
  return (
    <BackgroundWrapper>
      <SafeAreaView flex={1}>
        <Container
          withInput
          keyboardShouldPersistTaps="handled"
          isHeaderVisible={false}
          hasGradient={false}
          isScrollable
          imageBackground="none"
        >
          <Form
            initialValues={{
              department: state && { description: state },
              province: province && { description: province },
              district: district && { description: district },
              address: address || '',
              dataConfirmation: false,
            }}
            onSubmit={onPressContinue}
            validateOnChange
          >
            {({
              handleSubmit,
              handleBlur,
              values,
              errors,
              isValid,
              handleChange,
              setFieldValue,
              setFieldTouched,
              isSubmitting,
            }) => (
              <Box flex={1} mx="spacing-m">
                <Text mt="spacing-m" variant="Heading18Medium">{i18n.t('get-personal-data-title')}</Text>
                <Box mt="spacing-m" backgroundColor="complementaryIndigo050" px="spacing-m" py="spacing-m" borderRadius={24}>
                  <Text color="complementaryIndigo900" mb="spacing-xs" mt="spacing-xxxs" variant="Subtitle16pxMedium">
                    {userFullName}
                  </Text>
                  <Box
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box flex={1} flexDirection="row" flexWrap="wrap">
                      <Text color="primary700" mr="spacing-xxxxs" variant="body12">
                        {i18n.t('get-personal-data-form-label-document')}
                      </Text>
                      <Text
                        variant="body12Semibold"
                        color="complementaryIndigo900"
                        marginRight="spacing-s"
                      >
                        {documentNumber}
                      </Text>
                    </Box>
                    <Box flex={1} flexDirection="row" flexWrap="wrap">
                      <Text color="primary700" mr="spacing-xxxxs" variant="body12">
                        {i18n.t('get-personal-data-title-form-label-nacionality')}
                      </Text>
                      <Text color="complementaryIndigo900" variant="body12Semibold">
                        {DEFAULT_NATIONALITY}
                      </Text>
                    </Box>
                  </Box>
                </Box>
                <Text mt="spacing-s" variant="Subtitle20SemiBold">{i18n.t('get-personal-data-form-title')}</Text>
                <Dropdown
                  labelKey="description"
                  mt="spacing-s"
                  label={i18n.t('get-personal-data-dropdown-label-department')}
                  itemList={cities}
                  onChangeItem={(item: UbigeoType) => {
                    setFieldValue?.('department', item);
                    setFieldValue?.('province', null);
                    setFieldValue?.('district', null);
                    selectDepartment(item);
                  }}
                  value={values.department}
                  disabled={values.dataConfirmation}
                />
                <Dropdown
                  mt="spacing-s"
                  labelKey="description"
                  label={i18n.t('get-personal-data-dropdown-label-province')}
                  itemList={provinces}
                  onChangeItem={(item: UbigeoType) => {
                    setFieldValue?.('province', item);
                    setFieldValue?.('district', null);
                    selectProvince(item);
                  }}
                  value={values.province}
                  disabled={!values.department || values.dataConfirmation}
                />
                <Dropdown
                  mt="spacing-s"
                  labelKey="description"
                  label={i18n.t('get-personal-data-dropdown-label-district')}
                  itemList={districts}
                  onChangeItem={(item: UbigeoType) => {
                    setFieldValue?.('district', item);
                    selectDistrict(item);
                  }}
                  value={values.district}
                  disabled={!values.province || values.dataConfirmation}
                />
                <TextInput
                  containerProps={{ marginTop: 'spacing-s', marginBottom: 'spacing-m' }}
                  label={i18n.t('get-personal-data-input-label-address')}
                  placeholder={i18n.t('get-personal-data-input-label-address')}
                  disabled={values.dataConfirmation}
                  error={errors.address}
                  textHelper={errors.address}
                  value={values.address}
                  autoCapitalize="none"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  maxLength={FIELD_ADDRESS_MAX_LENGTH}
                />
                <CheckBox
                  mt={errors.address ? 'spacing-s' : 'spacing-none'}
                  variant="body"
                  testID="personal-data-checkbox-confirmation"
                  label={i18n.t('get-personal-data-checkbox-label-confirmation')}
                  onPress={() => {
                    setFieldTouched?.('address', true, true);
                    if (isValid) {
                      setFieldValue?.('dataConfirmation', !values.dataConfirmation);
                    }
                  }}
                  isCheck={values.dataConfirmation}
                />
                <Button
                  variant={values.dataConfirmation && isValid && !isSubmitting ? 'primary' : 'disabled'}
                  my="spacing-m"
                  onPress={handleSubmit}
                  testID="submit-personal-data"
                  label={i18n.t('button-label-confirm')}
                  disabled={!isValid || !values.dataConfirmation || isSubmitting}
                />
                <LoadingIndicator isVisible={!!isSubmitting} />
              </Box>
            )}
          </Form>
        </Container>
      </SafeAreaView>
    </BackgroundWrapper>
  );
};

export default GetPersonalData;
