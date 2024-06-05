/* eslint-disable react-native/no-raw-text */
import React from 'react';
import { View } from 'react-native';
import { Divider } from 'native-base';
import { NavigationPropsType } from 'src/types/types';
import { Container, Box, Text, TextInput, CheckBox, Button } from 'src/matrix-ui-components';
import { Background } from 'assets/images';
import { Form } from 'src/components/Form';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import MtxDropdown from 'libs/ui-toolkit/components/mtx-dropdown/MtxDropdown';
import MtxDivider from 'libs/ui-toolkit/components/mtx-divider/MtxDivider';
import MtxText from 'libs/ui-toolkit/components/mtx-text/MtxText';
import { i18n } from 'src/utils/core/MTXStrings';
import { UbigeoType } from 'src/utils/ubigeo/handlerUbigeo';
import useGetPersonalData from './hooks/useGetPersonalData';
import styles from './styles/GetPersonalDataStyle';
import { FIELD_OCCUPATION_MAX_LENGTH } from 'src/utils/constants';

const MtxGetPersonalData = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const { fromLogin } = route.params;
  const {
    userFullName,
    documentNumber,
    location,
    cities,
    provinces,
    districts,
    isLoading,
    selectDepartment,
    selectProvince,
    selectDistrict,
    onPressContinue,
  } = useGetPersonalData(props);
  const { state, province, district, address } = location;
  return (
    <Container
      withInput
      isHeaderVisible={false}
      isScrollable
      imageBackground={Background}
      goBackNavigate={() => navigation.goBack()}
    >
      <Form
        initialValues={{
          department: state && { description: state },
          province: province && { description: province },
          district: district && { description: district },
          address: address && address,
          dataConfirmation: false,
        }}
        onSubmit={onPressContinue}
        validateOnMount
      >
        {({ handleSubmit, values, isValid, handleChange, setFieldValue, isSubmitting }) => (
          <Box flex={1} mx="spacing-m">
            <MtxDivider height={40} />
            <MtxText style={styles.title}>{i18n.t('get-personal-data-title')}</MtxText>
            <Divider my={2} thickness={0} />
            <View style={styles.formContainer}>
              <Text mt="spacing-xxxs" variant="sectionTitleLight">
                {userFullName}
              </Text>
              <Divider my={1} thickness={0} />
              <View style={styles.headingSection}>
                <View style={styles.subtitleContainer}>
                  <Text mr="spacing-xxxxs" variant="personalDataSubtitle">
                    {i18n.t('get-personal-data-form-label-document')}
                  </Text>
                  <Text
                    variant="personalDataSubtitle"
                    color="primaryDarkest"
                    marginRight="spacing-s"
                  >
                    {documentNumber}
                  </Text>
                </View>
                <View style={styles.subtitleContainer}>
                  <Text mr="spacing-xxxxs" variant="personalDataSubtitle">
                    {i18n.t('get-personal-data-title-form-label-nacionality')}
                  </Text>
                  <Text variant="personalDataSubtitle" color="primaryDarkest">
                    Peruana
                  </Text>
                </View>
              </View>
              <Divider my={3} thickness={0} />
              <Text variant="formTitle">{i18n.t('get-personal-data-form-title')}</Text>
              <Divider my={2} thickness={0} />
              <MtxDropdown
                labelKey="description"
                label={i18n.t('get-personal-data-dropdown-label-department')}
                itemList={cities}
                onChangeItem={(item: UbigeoType) => {
                  setFieldValue?.('department', item);
                  setFieldValue?.('province', null);
                  setFieldValue?.('district', null);
                  selectDepartment(item);
                }}
                value={values.department}
                isDisabled={values.dataConfirmation}
              />
              <Divider my={2} thickness={0} />
              <MtxDropdown
                labelKey="description"
                label={i18n.t('get-personal-data-dropdown-label-province')}
                itemList={provinces}
                onChangeItem={(item: UbigeoType) => {
                  setFieldValue?.('province', item);
                  setFieldValue?.('district', null);
                  selectProvince(item);
                }}
                value={values.province}
                isDisabled={!values.department || values.dataConfirmation}
              />
              <Divider my={2} thickness={0} />
              <MtxDropdown
                labelKey="description"
                label={i18n.t('get-personal-data-dropdown-label-district')}
                itemList={districts}
                onChangeItem={(item: UbigeoType) => {
                  setFieldValue?.('district', item);
                  selectDistrict(item);
                }}
                value={values.district}
                isDisabled={!values.province || values.dataConfirmation}
              />
              <Divider my={2} thickness={0} />
              <TextInput
                containerProps={{ marginBottom: 'spacing-m' }}
                label={i18n.t('get-personal-data-input-label-address')}
                placeholder={i18n.t('get-personal-data-input-label-address')}
                disabled={values.dataConfirmation}
                value={values.address}
                autoCapitalize="none"
                onChangeText={handleChange('address')}
                maxLength={FIELD_OCCUPATION_MAX_LENGTH}
              />
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                marginTop="spacing-m"
                label={i18n.t('get-personal-data-checkbox-label-confirmation')}
                onPress={() => setFieldValue?.('dataConfirmation', !values.dataConfirmation)}
                isCheck={values.dataConfirmation}
              />
            </View>
            <Button
              variant={values.dataConfirmation && isValid && !isSubmitting ? 'primary' : 'disabled'}
              my="spacing-m"
              onPress={handleSubmit}
              label={i18n.t('button-label-confirm')}
              disabled={!isValid || !values.dataConfirmation || isSubmitting}
            />
          </Box>
        )}
      </Form>
      <LoadingIndicator isVisible={isLoading} />
    </Container>
  );
};

export default MtxGetPersonalData;
