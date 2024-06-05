import React from 'react';
import { Pressable } from 'react-native';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
import { i18n } from 'src/utils/core/MTXStrings';
import { NavigationPropsType } from 'src/types/types';
import { ThemeProvider } from '@shopify/restyle';
import { RFValue } from 'react-native-responsive-fontsize';
import Helpers from 'src/utils/Helpers';
import { formatDate } from 'src/utils/date-time/date-time';
import LoadingIndicator from 'src/components/LoadingIndicator/LoadingIndicator';
import useUserForm from '../hooks/useUserForm';
import PhoneForm from '../../components/phoneForm';
import AddressForm from '../../components/addressForm';
import Modal from '../../components/Modal';

export const UserFormScreen = (props: NavigationPropsType) => {
  const {
    formType,
    closeModal,
    openPhoneModal,
    openAddressModal,
    goToEditSchedule,
    goToHome,
    isOpen,
    submitPhoneModal,
    submitAddressModal,
    onSubmit,
    goBack,
    formatNumber,
    phoneFormat,
    phoneFormatForm,
    addressSelected,
    contactSelected,
    scheduleSelected,
    isLoading,
  } = useUserForm(props);

  const renderContact = (
    <Box>
      <Text variant="body14Regular" color="primaryDarkest" mt="spacing-xxxs">
        {Helpers.formatStringCamel(contactSelected.fullname)}
      </Text>
      <Text variant="body14Regular" color="primaryDarkest" mt="spacing-xxs" mb="spacing-xxxs">
        {`Teléfono: ${formatNumber(contactSelected.phone, phoneFormat)}`}
      </Text>
    </Box>
  );

  const renderAddress = (
    <Box>
      <Text numberOfLines={2} variant="body14Regular" color="primaryDarkest" mt="spacing-xxxs">
        {addressSelected.address}
      </Text>
      <Text numberOfLines={2} variant="body14Regular" color="primaryDarkest">
        {`${Helpers.formatStringCamel(addressSelected.department?.description ?? '')}, ${Helpers.formatStringCamel(addressSelected.province?.description ?? '')}, ${Helpers.formatStringCamel(addressSelected.district?.description ?? '')}`}
      </Text>
    </Box>
  );

  const renderSchedule = (
    <Box>
      <Text variant="body14Regular" color="primaryDarkest" mt="spacing-xxxs">
        {formatDate(scheduleSelected.date, 'dddd DD [de] MMMM YYYY')}
      </Text>
      <Text variant="body14Regular" color="primaryDarkest" mt="spacing-xxxs">
        {Helpers.formatTimeString(scheduleSelected.inning.schedule)}
      </Text>
    </Box>
  );

  return (
    <ThemeProvider theme={rebrandingTheme}>
      <Container
        withInput
        isScrollable
        isHeaderVisible
        goBackNavigate={goBack}
        imageBackground={BackgroundNew}
        headerProps={{
          title: i18n.t('request-card.userForm.title'),
          textAlign: 'left',
        }}
      >
        <Box flex={1} justifyContent="space-between" mx="spacing-m" pb="spacing-s">
          <Box>
            <Text variant="Subtitle20SemiBold" mt="spacing-xs" mb="spacing-xxs">
              {i18n.t('request-card.userForm.subtitle')}
            </Text>
            <Text variant="body13pxRegular" color="complementaryIndigo600">
              {i18n.t('request-card.userForm.description')}
            </Text>
            <Box
              mt="spacing-s"
              mb="spacing-xs"
              px="spacing-m"
              py="spacing-sm"
              pb="spacing-s"
              borderRadius={RFValue(24)}
              backgroundColor="primary100"
              flexDirection="row"
            >
              <Box width="85%">
                <Text color="primaryDarkest" mb="spacing-xxxxs" variant="Subtitle14Semibold">
                  {i18n.t('request-card.userForm.contactLabel')}
                </Text>
                {renderContact}
              </Box>
              <Pressable onPress={() => openPhoneModal()}>
                <Text
                  variant="Link14MediumBlue"
                  textDecorationLine="underline"
                  mt="spacing-l"
                  ml="spacing-xxxs"
                >
                  {i18n.t('request-card.userForm.edit')}
                </Text>
              </Pressable>
            </Box>
            <Box
              borderRadius={RFValue(24)}
              mb="spacing-s"
              px="spacing-m"
              py="spacing-sm"
              backgroundColor="primary100"
              flexDirection="row"
            >
              <Box width="85%">
                <Text color="primaryDarkest" mb="spacing-xxxs" variant="Subtitle14Semibold">
                  {i18n.t('request-card.userForm.addressLabel')}
                </Text>
                {renderAddress}
              </Box>
              <Pressable onPress={() => openAddressModal()}>
                <Text
                  variant="Link14MediumBlue"
                  color="complementaryIndigo600"
                  textDecorationLine="underline"
                  mt="spacing-xm"
                  ml="spacing-xxxs"
                >
                  {i18n.t('request-card.userForm.edit')}
                </Text>
              </Pressable>
            </Box>
            <Box
              borderRadius={RFValue(24)}
              mb="spacing-s"
              px="spacing-m"
              py="spacing-sm"
              pb="spacing-s"
              backgroundColor="primary100"
              flexDirection="row"
            >
              <Box width="85%">
                <Text color="primaryDarkest" mb="spacing-xxxs" variant="Subtitle14Semibold">
                  {i18n.t('request-card.userForm.scheduleLabel')}
                </Text>
                {renderSchedule}
              </Box>
              <Pressable onPress={() => goToEditSchedule()}>
                <Text
                  variant="Link14MediumBlue"
                  color="complementaryIndigo600"
                  textDecorationLine="underline"
                  mt="spacing-xxxm"
                  ml="spacing-xxxs"
                >
                  {i18n.t('request-card.userForm.edit')}
                </Text>
              </Pressable>
            </Box>
          </Box>
          <Box mb="spacing-s">
            <Button
              variant="primary"
              onPress={onSubmit}
              label={i18n.t('request-card.userForm.submit')}
            />
            <Button
              variant="secondary"
              onPress={goToHome}
              label={i18n.t('request-card.userForm.cancel')}
            />
          </Box>
        </Box>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </Container>
      {isOpen ? (
        <Modal
          onClose={closeModal}
          title={
            formType === 'phone' ? 'request-card.phoneForm.title' : 'request-card.addressForm.title'
          }
        >
          {formType === 'phone' ? (
            <PhoneForm
              onSubmit={submitPhoneModal}
              phoneNumber={formatNumber(contactSelected.phone.substring(3, 12), phoneFormatForm)}
            />
          ) : (
            <AddressForm
              onSubmit={submitAddressModal}
              addressEdit={addressSelected}
              props={props}
            />
          )}
        </Modal>
      ) : null}
    </ThemeProvider>
  );
};
export default UserFormScreen;
