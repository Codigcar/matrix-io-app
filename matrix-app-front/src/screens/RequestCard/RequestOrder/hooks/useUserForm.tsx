import React, { useState } from 'react';
import { PREFIX_NUMBER, STATUS_AVAILABLE_DAY, STATUS_DELIVERY_ORDER } from 'src/utils/constants';
import { NavigationPropsType } from 'src/types/types';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import Helpers from 'src/utils/Helpers';
import { createDeliveryOrder, getCalendar } from 'src/api/PhysicalCardServices';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { resetNavigation } from 'src/utils/navigationHandler';
import {
  Address,
  AddressFormValues,
  Contact,
  PhoneNumber,
} from 'src/api/types/requestPhysicalCardTypes';
import { logCrashlytics } from 'src/utils/Analytics';
import { setStatusDeliveryPhysicalCard } from 'src/core/libraries-implementation/state-manager/states';

const useUserForm = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;

  const {
    address, date, inning, contact, calendarDaysList, onboarding,
  } = params;

  const phoneFormat = '### ### ### ###';
  const phoneFormatForm = '### ### ###';
  const fullScheduleError = 'schedule full';

  const formatNumber = (value: string, pattern: string) => {
    let i = 0;
    const phone = value.toString();
    return pattern.replace(/#/g, () => phone[i++]);
  };

  const goBack = () => navigation.goBack();
  const dispatch = useDispatch();

  const [addressSelected, setAddressSelected] = useState<Address>(address);
  const [contactSelected, setContactSelected] = useState<Contact>(contact);
  const [scheduleSelected, setScheduleSelected] = useState({ date, inning });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string>('phone');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      setAddressSelected(address);
      setScheduleSelected({ date, inning });
      return () => {};
    }, [date, inning, address]),
  );

  const closeModal = () => {
    setIsOpen(false);
  };
  const openPhoneModal = () => {
    setFormType('phone');
    setIsOpen(true);
  };
  const openAddressModal = () => {
    setIsOpen(true);
    setFormType('address');
  };

  const goToHome = () => {
    resetNavigation(navigation, navigationScreenNames.bottomTabNavigator);
  };

  const goToEditSchedule = () => {
    navigation.push(navigationScreenNames.physicalCard.schedule, {
      contact: contactSelected,
      isEditing: true,
      lastAddress: addressSelected,
      address: addressSelected,
      calendarDaysList,
      inningAvailable: scheduleSelected.inning,
      dateAvailable: scheduleSelected.date,
      lastInning: scheduleSelected,
      onboarding,
    });
  };

  const submitPhoneModal = (values: PhoneNumber) => {
    const newPhone = contactSelected;
    newPhone.phone = `+${PREFIX_NUMBER}${values.phoneNumber.replace(/ /g, '')}`;
    setContactSelected(newPhone);
    closeModal();
  };

  const submitAddressModal = async (values: AddressFormValues) => {
    const newAddress: Address = {
      department: values.department,
      province: values.province,
      district: values.district,
      address: Helpers.formatStringCamel(values.addressDelivery ?? '').trim(),
      label: `${Helpers.formatStringCamel(
        values.addressDelivery ?? '',
      )}, ${Helpers.formatStringCamel(
        values.province?.description ?? '',
      )}, ${Helpers.formatStringCamel(values.district?.description ?? '')}`,
    };
    if (values.addressReference) newAddress.reference = values.addressReference.trim();
    closeModal();

    if (values.district) {
      try {
        setIsLoading(true);
        const calendarResponse = await getCalendar(values.district.code);
        setIsLoading(false);
        if (calendarResponse.rangeDetail) {
          const firstDateAvailable = calendarResponse.rangeDetail.find(
            (element) => element.dayData.dayStatus === STATUS_AVAILABLE_DAY,
          );
          const firstInningAvailable = firstDateAvailable?.dayData.innings.find(
            (inningValue) => inningValue.status === STATUS_AVAILABLE_DAY,
          );
          navigation.push(navigationScreenNames.physicalCard.schedule, {
            isEditing: true,
            contact: contactSelected,
            address: newAddress,
            calendarDaysList: calendarResponse.rangeDetail,
            inningAvailable: firstInningAvailable,
            dateAvailable: firstDateAvailable?.dayData.day,
            lastInning: scheduleSelected,
            lastAddress: address,
            onboarding,
          });
        }
      } catch (error) {
        setIsLoading(false);
        logCrashlytics({
          scope: 'API',
          fileName: 'RequestCard/RequestOrder/hooks/useUserForm.tsx',
          service: 'PhysicalCardServices.getCalendar',
          error,
        });
        navigation.navigate(navigationScreenNames.genericError);
      }
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const schedule: any = {
        date: scheduleSelected.date,
        inning: scheduleSelected.inning.name,
        phone: contactSelected.phone,
        location: {
          address: addressSelected.address,
          code: addressSelected.district?.code,
        },
      };
      if (addressSelected.reference) {
        schedule.location.reference = addressSelected.reference;
      }
      const createDeliveryOrderResponse = await createDeliveryOrder(schedule);
      setIsLoading(false);
      if (createDeliveryOrderResponse.deliveryOrderId) {
        dispatch(
          setStatusDeliveryPhysicalCard({
            statusDeliveryPhysicalCard: STATUS_DELIVERY_ORDER.pendingActivation,
          }),
        );
        resetNavigation(navigation, navigationScreenNames.physicalCard.summary, {
          date: scheduleSelected.date,
          inning: scheduleSelected.inning.schedule,
          phone: contactSelected.phone,
          address: addressSelected,
          name: contactSelected.fullname,
          onboarding,
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      if (error.response?.data?.description === fullScheduleError) {
        navigation.navigate(navigationScreenNames.physicalCard.dateUnavailable, {
          isEditing: false,
          contact: contactSelected,
          address: addressSelected,
        });
      } else {
        logCrashlytics({
          scope: 'API',
          fileName: 'RequestCard/RequestOrder/hooks/useUserForm.tsx',
          service: 'PhysicalCardServices.createDeliveryOrder',
          error,
        });
        navigation.navigate(navigationScreenNames.physicalCard.processError);
      }
    }
  };

  return {
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
    address,
    isLoading,
    formatNumber,
    phoneFormat,
    phoneFormatForm,
    addressSelected,
    contactSelected,
    scheduleSelected,
  };
};

export default useUserForm;
