import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { NavigationPropsType } from 'src/types/types';

const useAlias = (props: NavigationPropsType) => {
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
      alias: '',
    },
  });

  const success = false;
  const { navigation } = props;

  // Navigation

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const goToProfile = () => {
    navigation.navigate('MyProfile');
  };

  useEffect(() => {
    if (success) {
      const newAlias = getValues('alias');
      console.log('set from params');
      goToProfile();
    }
  }, [success]);

  const onSubmit = (): void => {
    const body = { alias: getValues('alias') };
    console.log('body', body);
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
  };
};

export default useAlias;
