import { FieldValues, useForm } from 'react-hook-form';
import { NavigationPropsType } from 'src/types/types';
import { PHONE_NUMBER_LENGHT, PREFIX_NUMBER } from 'src/utils/constants';
import { useEffect, useState } from 'react';
import { useChallenge } from 'src/components/Challenge';
import { UpdatePhoneNumber } from 'src/api/AuthServices';
import { useSelector } from 'react-redux';
import { logCrashlytics } from 'src/utils/Analytics';
import { i18n } from 'src/utils/core/MTXStrings';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { ChallengeClosed } from 'src/components/Challenge/Challenge';

const userSelector = (state: any) => state.session.user;

const useNewPhone = (props: NavigationPropsType) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
    getValues,
    getFieldState,
    setError,
    clearErrors,
  } = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      phone: '',
    },
  });

  const { waitForChallenge } = useChallenge();
  const { navigation } = props;
  const success = false;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { phoneNumber } = useSelector(userSelector);
  const CODE_ERROR_PHONE_NUMBER_DUPLICATED = 'ValidationErrorException';

  const phoneLenghtRule = {
    value: PHONE_NUMBER_LENGHT,
    message: i18n.t('phone-label-invalid'),
  };

  const onPressBackArrow = () => {
    navigation.navigate(navigationScreenNames.profileStack, {
      screen: navigationScreenNames.myProfile,
      params: {
        isFinishedDataUpdate: false,
      },
    });
  };

  const goToOTP = () => {
    navigation.navigate('VerifyOTP');
  };

  useEffect(() => {
    if (success) {
      const phone = `+${PREFIX_NUMBER}${getValues('phone')}`;
      goToOTP();
    }
  }, [success]);

  // Validation

  const submitPhone = async () => {
    setIsButtonEnabled(false);
    const phone = `+${PREFIX_NUMBER}${getValues('phone')}`;
    const body = { phoneNumber: phone };

    if (phone.charAt(3) !== '9') {
      setError('phone', {
        type: 'error',
        message: i18n.t('phone-label-invalid'),
      });
    } else {
      try {
        await UpdatePhoneNumber(phone);
      } catch (error) {
        logCrashlytics({
          scope: 'API',
          fileName: 'Profile/ChangePhone/NewPhone/hooks/useNewPhone.tsx',
          service: 'AuthServices.UpdatePhoneNumber',
          error,
        });

        if (error?.response?.data?.description === CODE_ERROR_PHONE_NUMBER_DUPLICATED) {
          setError('phone', {
            type: 'error',
            message: i18n.t('phone-error-duplicate'),
          });
        } else {
          navigation.navigate(navigationScreenNames.personalChangeDataNotAvailable);
        }
        return;
      }

      try {
        await waitForChallenge?.();
        setIsButtonEnabled(true);

        navigation.navigate('VerifyOTP', {
          destination: 'celular',
          phone: ` ${phone.match(new RegExp(`.{1,${3}}`, 'g')).join(' ')}`,
          isChangeDataProcess: true,
        });
      } catch (error) {
        if (error instanceof ChallengeClosed) {
          navigation.navigate(navigationScreenNames.home);
        } else {
          setIsButtonEnabled(true);
        }
      }
    }
  };

  const hasLengthNumber = (value: string) => value.length === 9;
  const hasFirstCharAtNine = (value: string) => value.charAt(0) === '9';
  const hasDifferentCurrentNumber = (value: string) => {
    if (phoneNumber !== `+51${value}`) return true;
    return false;
  };

  const checkValidations = (value: string) => {
    const lengthNumber = hasLengthNumber(value);
    const differentCurrentNumber = hasDifferentCurrentNumber(value);
    const firstCharAtNine = hasFirstCharAtNine(value);

    clearErrors('phone');
    setIsButtonEnabled(false);

    if (value && !firstCharAtNine) {
      setError('phone', {
        type: 'error',
        message: i18n.t('phone-label-invalid'),
      });
    } else if (!differentCurrentNumber) {
      setError('phone', {
        type: 'error',
        message: i18n.t('phone-error-duplicate'),
      });
    }

    if (lengthNumber && differentCurrentNumber && firstCharAtNine) setIsButtonEnabled(true);
  };

  const maskValue = (value: string): string =>
    value
      .replace(/ /g, '')
      .slice(0, PHONE_NUMBER_LENGHT)
      .split('')
      .map((char, index) => {
        if (index === 2 || index === 5) {
          return `${char} `;
        }
        return char;
      })
      .join('')
      .trim();

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
    submitPhone,
    phoneLenghtRule,
    checkValidations,
    isButtonEnabled,
    maskValue,
  };
};

export default useNewPhone;
