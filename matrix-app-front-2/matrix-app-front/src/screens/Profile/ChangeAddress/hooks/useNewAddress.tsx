import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useChallenge } from 'src/components/Challenge';
import { NavigationPropsType } from 'src/types/types';
import { getCities, getTree, UbigeoType } from 'src/utils/ubigeo/handlerUbigeo';

const useNewAddress = (props: NavigationPropsType) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    getValues,
    getFieldState,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      address: '',
    },
  });

  const cities = getCities();
  const [provinces, setProvinces] = useState<UbigeoType[]>([]);
  const [districts, setDistricts] = useState<UbigeoType[]>([]);
  const [newUbigeo, setNewUbigeo] = useState<string>('');
  const success = false;
  const { waitForChallenge } = useChallenge();
  const { navigation } = props;

  // Navigation

  const onPressBackArrow = (): void => {
    navigation.goBack();
  };

  const goToProfile = (): void => {
    navigation.navigate('MyProfile');
  };

  // Handler Ubigeo
  const selectCity = (city: UbigeoType) => {
    const provincesAux = getTree(city.code);
    setProvinces(provincesAux);
  };

  const selectProvince = (province: UbigeoType) => {
    const districtsAux = getTree(province.code);
    setDistricts(districtsAux);
  };

  const selectDistrict = (district: UbigeoType) => {
    setNewUbigeo(district.code);
  };

  useEffect(() => {
    if (success) {
      const newAddress = getValues('address');
      console.log('set addreess from params');
      goToProfile();
    }
  }, [success]);

  const onSubmit = async() => {
    const body = { address: getValues('address'), ubigeo: newUbigeo };
    console.log('body', body);
    try {
      await waitForChallenge?.();
      
    } catch (error) { 

    }
  };

  return {
    control,
    handleSubmit,
    watch,
    setValue,
    isValid,
    errors,
    getValues,
    getFieldState,
    isDirty,
    onPressBackArrow,
    onSubmit,
    cities,
    provinces,
    districts,
    selectCity,
    selectProvince,
    selectDistrict,
  };
};

export default useNewAddress;
