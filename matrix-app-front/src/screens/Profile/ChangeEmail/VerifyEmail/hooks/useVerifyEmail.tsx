import { FieldValues, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { NavigationPropsType } from 'src/types/types';
import { getString } from 'src/utils/core/MTXStrings';
// Selector
const emailDataSelector = (state: any) => state.session.user?.email;

const useVerifyEmail = (props: NavigationPropsType) => {
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
      email: '',
    },
  });
  const currentEmail = useSelector(emailDataSelector);

  const {
    navigation,
    route: { params },
  } = props;
  const { emailMask } = params;

  const feedbackMessage = getString('email-feedback', emailMask);

  // Navigation

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const goToNewEmail = () => {
    navigation.navigate('NewEmail');
  };

  // Validation

  const verifyEmail = (): void => {
    const email = getValues('email');
    if (currentEmail === email) goToNewEmail();
  };

  const verifyError = (): boolean => {
    const email = getValues('email');
    if (currentEmail !== email) return false;
    return true;
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
    goToNewEmail,
    emailMask,
    verifyEmail,
    verifyError,
    feedbackMessage,
  };
};

export default useVerifyEmail;
