import React from 'react';
import { Pressable } from 'react-native';
import {
  Container, Text, Box, Button, rebrandingTheme,
} from 'matrix-ui-components';
import { BackgroundNew } from 'assets/images';
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
import { string } from '../../shared/strings/string';

export const UserFormScreen: React.FC<NavigationPropsType> = (props) => {
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
        {`${Helpers.formatStringCamel(
          addressSelected.department?.description ?? '',
        )}, ${Helpers.formatStringCamel(
          addressSelected.province?.description ?? '',
        )}, ${Helpers.formatStringCamel(addressSelected.district?.description ?? '')}`}
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
          title: string.requestCardUseFormTitle,
          textAlign: 'left',
        }}
      >
        <Box flex={1} justifyContent="space-between" mx="spacing-m" pb="spacing-s">
          <Box>
            <Text variant="Subtitle20SemiBold" mt="spacing-xs" mb="spacing-xxs">
              {string.requestCardUserFormSubtitle}
            </Text>
            <Text variant="body13pxRegular" color="complementaryIndigo600">
              {string.requestCardUserFormDescription}
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
                  {string.requestCardUserFormContactLabel}
                </Text>
                {renderContact}
              </Box>
              <Pressable onPress={() => openPhoneModal()}>
                <Text
                  testID="editContact"
                  variant="Link14MediumBlue"
                  textDecorationLine="underline"
                  mt="spacing-l"
                  ml="spacing-xxxs"
                >
                  {string.requestCardUserFormEdit}
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
                  {string.requestCardUserFormAddressLabel}
                </Text>
                {renderAddress}
              </Box>
              <Pressable onPress={() => openAddressModal()}>
                <Text
                  testID="editAddress"
                  variant="Link14MediumBlue"
                  color="complementaryIndigo600"
                  textDecorationLine="underline"
                  mt="spacing-xm"
                  ml="spacing-xxxs"
                >
                  {string.requestCardUserFormEdit}
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
                  {string.requestCardUserFormScheduleLabel}
                </Text>
                {renderSchedule}
              </Box>
              <Pressable onPress={() => goToEditSchedule()}>
                <Text
                  testID="editSchedule"
                  variant="Link14MediumBlue"
                  color="complementaryIndigo600"
                  textDecorationLine="underline"
                  mt="spacing-xxxm"
                  ml="spacing-xxxs"
                >
                  {string.requestCardUserFormEdit}
                </Text>
              </Pressable>
            </Box>
          </Box>
          <Box mb="spacing-s">
            <Button variant="primary" onPress={onSubmit} label={string.requestCardUserFormSubmit} />
            <Button
              variant="secondary"
              onPress={goToHome}
              label={string.requestCardUserFormCancel}
            />
          </Box>
        </Box>
        {isLoading && <LoadingIndicator isVisible={isLoading} />}
      </Container>
      {isOpen ? (
        <Modal
          onClose={closeModal}
          title={
            formType === 'phone' ? string.requestCardPhoneFormTitle : string.requestCardAddressFormTitle
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
