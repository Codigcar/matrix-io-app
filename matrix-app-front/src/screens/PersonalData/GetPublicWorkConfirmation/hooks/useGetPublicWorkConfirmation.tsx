import { NavigationPropsType } from 'src/types/types';
import { FormikHelpers } from 'formik';
import { FormValues } from 'src/components/Form/form.props';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';
import { saveWork } from 'src/api/Onboarding';
import useKeyboard from 'src/utils/hooks/useKeyboard';
import { useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';

type InputRefs = {
  [key:string]: TextInput | null
};

const useGetPublicWorkConfirmation = (props: NavigationPropsType) => {
  const { navigation, route } = props;
  const {
    occupation, profession, workPlace, livesInPeru,
  } = route.params.values;

  const inputs = useRef<InputRefs>({});

  const focusField = (key:string) => {
    inputs.current[key]?.focus();
  };

  const scrollRef = useRef<ScrollView>();
  const { isKeyboardVisible } = useKeyboard();

  if (isKeyboardVisible) {
    scrollRef.current?.scrollToEnd?.({ animated: true });
  }

  const onPressContinue = async (values: FormValues, actions?: FormikHelpers<FormValues>) => {
    const { extraFunctions, extraFunctionsOrganizationName, extraFunctionsPosition } = values;
    actions?.setSubmitting?.(true);
    try {
      let fulfillmentWorkDataBody;
      if (extraFunctions) {
        fulfillmentWorkDataBody = {
          occupation,
          jobProfession: profession,
          laborsCenter: workPlace,
          livesInPeru,
          extraFunctions,
          extraFunctionsOrganizationName,
          extraFunctionsPosition,
        };
      } else {
        fulfillmentWorkDataBody = {
          occupation,
          jobProfession: profession,
          laborsCenter: workPlace,
          livesInPeru,
          extraFunctions,
        };
      }
      const response = await saveWork(fulfillmentWorkDataBody);
      if (response.code === 'successful_request') {
        logVirtualEventAnalytics({
          eventName: 'virtualEventApp25',
          seccion: 'Exito',
          tipoEvento: 'Click',
          tipoElemento: 'Boton',
          valor: 'Continuar',
        });
        actions?.setSubmitting?.(false);
        navigation.navigate(navigationScreenNames.personalDataComplete);
      } else {
        actions?.setSubmitting?.(false);
        navigation.navigate(navigationScreenNames.genericError);
      }
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'PersonalData/GetPublicWorkConfirmation/hooks/useGetPublicWorkConfirmation.tsx',
        service: 'fulfillmentWorkData',
        error,
      });
      actions?.setSubmitting?.(false);
      navigation.navigate(navigationScreenNames.genericError);
    } finally {
      actions?.setSubmitting?.(false);
    }
  };

  const onBackPress = () => navigation.goBack();

  return {
    onPressContinue,
    onBackPress,
    isKeyboardVisible,
    scrollRef,
    focusField,
    inputs,
  };
};

export default useGetPublicWorkConfirmation;
