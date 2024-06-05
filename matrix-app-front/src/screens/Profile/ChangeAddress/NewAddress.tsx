import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import {
  Container,
  Box,
  Text,
  TextInput,
  CheckBox,
  Button,
  SafeAreaBox,
  Dropdown,
} from 'matrix-ui-components';
import { Form } from 'src/components/Form';
import { i18n } from 'src/utils/core/MTXStrings';
import { UbigeoType } from 'src/utils/ubigeo/handlerUbigeo';
import { FIELD_OCCUPATION_MAX_LENGTH } from 'src/utils/constants';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import useGetPersonalData from 'src/screens/PersonalData/GetPersonalData/hooks/useGetPersonalData';

const DEFAULT_NATIONALITY = 'Peruano';

const NewAddress = (props: NavigationPropsType) => {
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
  const { state, province, district, address } = location;
  const { navigation } = props;
  const onPressBackArrow = () => {
    navigation.goBack();
  };

  return (
    <BackgroundWrapper>
      <Container
        withInput
        isHeaderVisible
        isHeaderTransparent
        hasGradient={false}
        isScrollable
        imageBackground="none"
        goBackNavigate={onPressBackArrow}
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
            <SafeAreaBox flex={1}>
              <Box flex={1} mx="spacing-m">
                <Text mt="spacing-m" variant="Heading18Medium">
                  {i18n.t('changeData.address.title')}
                </Text>
                <Text mt="spacing-m" mb="spacing-m" variant="body14pxRegular">
                  {i18n.t('changeData.address.subtitle')}
                </Text>
                <Dropdown
                  labelKey="description"
                  // mt="spacing-s"
                  label={i18n.t('get-personal-data-dropdown-label-department')}
                  itemList={cities}
                  onChangeItem={(item: UbigeoType) => {
                    setFieldValue?.('department', item);
                    setFieldValue?.('province', null);
                    setFieldValue?.('district', null);
                    selectDepartment(item);
                  }}
                  // value={values.department}
                  disabled={values.dataConfirmation}
                  variant="body14pxRegular"
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
                  // value={values.province}
                  disabled={!values.department || values.dataConfirmation}
                  variant="body14pxRegular"
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
                  // value={values.district}
                  disabled={!values.province || values.dataConfirmation}
                  variant="body14pxRegular"
                />
                <TextInput
                  containerProps={{ marginTop: 'spacing-s', marginBottom: 'spacing-m' }}
                  label={i18n.t('get-personal-data-input-label-address')}
                  placeholder={i18n.t('get-personal-data-input-label-address')}
                  disabled={values.dataConfirmation}
                  error={errors.address}
                  textHelper={errors.address}
                  // value={values.address}
                  autoCapitalize="none"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  maxLength={FIELD_OCCUPATION_MAX_LENGTH}
                  variant="body14pxRegular"
                />
                <CheckBox
                  mt={errors.address ? 'spacing-s' : 'spacing-none'}
                  variant="body14pxRegular"
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
                  variant={
                    values.dataConfirmation && isValid && !isSubmitting ? 'primary' : 'disabled'
                  }
                  my="spacing-m"
                  onPress={() => {}}
                  testID="submit-personal-data"
                  label={i18n.t('changeData.address.button-save')}
                  disabled={!isValid || !values.dataConfirmation || isSubmitting}
                />
                <LoadingIndicator isVisible={!!isSubmitting} />
              </Box>
            </SafeAreaBox>
          )}
        </Form>
      </Container>
    </BackgroundWrapper>
  );
};

export default NewAddress;
