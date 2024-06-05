import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { getString } from 'src/utils/core/MTXStrings';
import { PHONE_NUMBER_LENGHT } from 'src/utils/constants';
import { useEffect } from 'react';

// Selector
const phoneDataSelector = (state: any) => state.session.user?.phoneNumber;

const usePhone = (props: NavigationPropsType) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    getValues,
    setError,
    getFieldState,
    clearErrors,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
    },
  });


  const currentPhone = useSelector(phoneDataSelector);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const {
    navigation,
    route: { params },
  } = props;

    const phoneLenghtRule = {
    value: PHONE_NUMBER_LENGHT,
    message: `El número de celular debe tener ${PHONE_NUMBER_LENGHT} dígitos.`,
  };

  // Navigation

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const goToNewPhone = () => {
    navigation.navigate('NewPhone');
  };

  // Validation
  const verifyPhone = (): void => {
    const phone = `+51${getValues('phone').replaceAll(' ', '')}`;
    console.log('PHONE', phone.charAt(3));
    if (phone.charAt(3) !== '9'){
      console.log('Hay error PHONE');
      setError('phone', {
        type: 'error',
        message: getString('phone-label-invalid'),
      });
    }
  };

  const checkValidations = (value:string) => {
    console.log(value);
    console.log('TAM', value.length);
    if(value.length <= 10) clearErrors('phone');
    if (value.length >= 11){
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }

  useEffect(() => {
    // goToOTP
    const a = 'a';
    return () => {
      clearErrors('phone');
    };
  }, []);

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
    verifyPhone,
    phoneLenghtRule,
    isButtonEnabled,
    checkValidations,
  };
};

export default usePhone;
