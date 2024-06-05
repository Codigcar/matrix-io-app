import { useEffect, useRef } from 'react';
import { BackHandler, TextInput } from 'react-native';
import { NavigationPropsType } from 'src/types/types';
import { FormValues } from 'src/components/Form/form.props';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logVirtualEventAnalytics } from 'src/utils/Analytics';

type InputRefs = {
  [key:string]: TextInput | null
};

const useGetWorkData = (props: NavigationPropsType) => {
  const { navigation } = props;
  const inputs = useRef<InputRefs>({});
  const profession = useRef(null);
  const workPlace = useRef(null);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  const onPressContinue = (values: FormValues) => {
    logVirtualEventAnalytics({
      eventName: 'virtualEventApp24',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Continuar',
    });
    navigation.navigate(navigationScreenNames.getPublicWorkConfirmation, {
      values,
    });
  };
  const onBackPress = () => navigation.goBack();

  const focusField = (key:string) => {
    inputs.current[key]?.focus();
  };

  return {
    onPressContinue,
    onBackPress,
    profession,
    workPlace,
    focusField,
    inputs,
  };
};

export default useGetWorkData;
