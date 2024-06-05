import { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { FormikHelpers } from 'formik';
import { NavigationPropsType } from 'src/types/types';
import { useSelector } from 'react-redux';
import { FormValues } from 'src/components/Form/form.props';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import Helpers from 'src/utils/Helpers';
import {
  getCities,
  getTree,
  getDepartmentByName,
  getElementByName,
  UbigeoType,
} from 'src/utils/ubigeo/handlerUbigeo';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { saveAdress } from 'src/api/Onboarding';

const userDataSelector = (state: any) => state.session.user;

const useGetPersonalData = (props: NavigationPropsType) => {
  const { navigation } = props;
  const userData = useSelector(userDataSelector);
  const {
    name, lastName, documentNumber, location,
  } = userData;
  const cities = getCities();
  const [provinces, setProvinces] = useState<UbigeoType[]>([]);
  const [districts, setDistricts] = useState<UbigeoType[]>([]);
  const [newUbigeo, setNewUbigeo] = useState<string>('');

  // Handler Ubigeo
  const selectDepartment = (department: UbigeoType) => {
    const provincesAux = getTree(department.code);
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
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp22',
      screenName: navigationScreenNames.getPersonalData,
      seccion: 'Exito',
      tipoEvento: 'Visualizar',
      tipoElemento: 'Pantalla',
      valor: 'Domicilio-Exito',
    });

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (location.state) {
      const departament = getDepartmentByName(location.state);
      if (departament) selectDepartment(departament);
    }
    if (location.province) {
      const province = getElementByName(location.province);
      if (province) selectProvince(province);
    }
  }, []);

  const onPressContinue = async (values: FormValues, actions?: FormikHelpers<FormValues>) => {
    const {
      department, province, district, address,
    } = values;
    actions?.setSubmitting(true);
    try {
      const addressData = {
        department: department.description,
        province: province.description,
        district: district.description,
        address,
      };
      const response = await saveAdress(addressData);
      if (response.code === 'successful_request') {
        logVirtualEventAnalytics({
          eventName: 'virtualEventApp23',
          seccion: 'Exito',
          tipoEvento: 'Click',
          tipoElemento: 'Boton',
          valor: 'Confirmar',
        });
        actions?.setSubmitting(false);
        navigation.navigate(navigationScreenNames.getWorkData);
      } else {
        actions?.setSubmitting(false);
        navigation.navigate(navigationScreenNames.genericError);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PersonalData/GetPersonalData/hooks/useGetPersonalData.tsx',
        service: 'fulfillmentAddress',
        error,
      });
      actions?.setSubmitting(false);
      navigation.navigate(navigationScreenNames.genericError);
    } finally {
      actions?.setSubmitting(false);
    }
  };

  const userFullName = Helpers.formatStringCamel(`${name} ${lastName}`);

  return {
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
  };
};

export default useGetPersonalData;
