import { useEffect, useState } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { useSelector } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import Helpers from 'src/utils/Helpers';
import { STATUS_AVAILABLE_DAY } from 'src/utils/constants';
import { Address, AddressFormValues, LocationProps } from 'src/api/types/requestPhysicalCardTypes';
import { useLocation } from 'src/store/states/locationContext';
import { getCalendar } from 'src/api/PhysicalCardServices';
import { logCrashlytics } from 'src/utils/Analytics';
import getProfileData from 'src/api/ProfileServices';

const userData = (state: any) => (state.session ? state.session.user || '' : '');

const useLocationForm = (props: NavigationPropsType) => {
  const {
    navigation,
    route: { params },
  } = props;
  const { onboarding } = params;

  const {
    departments, getDepartments, getProvinces, getDistricts, loadings,
  } = useLocation();

  const goBack = () => {
    if (onboarding) navigation.goBack();
    else navigation.navigate(navigationScreenNames.bottomTabNavigator, { screen: 'Card' });
  };

  const userLocation = useSelector(userData);
  const [userContact, setUserContact] = useState({
    fullname: userLocation.fullName || '',
    phone: userLocation.phoneNumber || '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);

  const [addressDelivery, setAddressDelivery] = useState<Address>({
    department: null,
    province: null,
    district: null,
    address: '',
    label: '',
  });

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      try {
        const response = await getProfileData();
        if (response) {
          const auxUser = {
            fullname: `${response.name} ${response.lastName}`,
            phone: response.phone_number,
          };
          setUserContact(auxUser);
        }
      } catch (error: any) {
        setIsLoading(false);
        navigation.navigate(navigationScreenNames.genericError, {
          nextScreen: navigationScreenNames.bottomTabNavigator,
        });
        logCrashlytics({
          scope: 'API',
          fileName: 'src/screens/RequestCard/RequestOrder/hooks/useLocationForm.tsx',
          service: 'getProfileDatatUser',
          error,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (onboarding) getUserData();
  }, []);

  useEffect(() => {
    getDepartments().catch(() => {
      navigation.navigate(navigationScreenNames.physicalCard.processError);
    });
  }, [getDepartments, navigation]);

  const selectDepartment = async (department: LocationProps) => {
    try {
      const provincesList = await getProvinces(department);
      if (provincesList && provincesList.length) setProvinces(provincesList);
      setDistricts([]);
    } catch (error) {
      navigation.navigate(navigationScreenNames.physicalCard.processError);
    }
  };

  const selectProvince = async (province: LocationProps) => {
    try {
      const districtsList = await getDistricts(province);
      if (districtsList && districtsList.length) setDistricts(districtsList);
    } catch (error) {
      navigation.navigate(navigationScreenNames.physicalCard.processError);
    }
  };

  const onSubmit = async (values: AddressFormValues) => {
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
    setAddressDelivery(newAddress);

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
            (inning) => inning.status === STATUS_AVAILABLE_DAY,
          );
          navigation.navigate(navigationScreenNames.physicalCard.schedule, {
            isEditing: false,
            contact: userContact,
            address: newAddress,
            calendarDaysList: calendarResponse.rangeDetail,
            inningAvailable: firstInningAvailable,
            dateAvailable: firstDateAvailable?.dayData.day,
            onboarding,
          });
        }
      } catch (error) {
        setIsLoading(false);
        logCrashlytics({
          scope: 'API',
          fileName: 'RequestCard/RequestOrder/hooks/useLocationForm.tsx',
          service: 'PhysicalCardServices.getCalendar',
          error,
        });
        navigation.navigate(navigationScreenNames.genericError);
      }
    }
  };

  return {
    onSubmit,
    goBack,
    userLocation,
    departments,
    provinces,
    districts,
    selectDepartment,
    selectProvince,
    addressDelivery,
    loadings,
    isLoading,
  };
};

export default useLocationForm;
