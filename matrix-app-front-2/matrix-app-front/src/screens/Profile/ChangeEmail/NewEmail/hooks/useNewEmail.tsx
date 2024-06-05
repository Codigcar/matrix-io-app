import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useChallenge } from 'src/components/Challenge';
import { NavigationPropsType } from 'src/types/types';
import { logCrashlytics } from 'src/utils/Analytics';
import { UpdateEmail } from 'src/api/AuthServices';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { FormikHelpers } from 'formik';
import { FormValues } from 'src/components/Form/form.props';
import { i18n } from 'src/utils/core/MTXStrings';
import { ChallengeClosed } from 'src/components/Challenge/Challenge';

const userSelector = (state: any) => state.session.user;

const useNewEmail = (props: NavigationPropsType) => {
  const { email } = useSelector(userSelector);
  const { waitForChallenge } = useChallenge();
  const { navigation } = props;
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const CODE_ERROR_EMAIL_DUPLICATED = 'ValidationErrorException';

  const onPressBackArrow = () => {
    navigation.navigate(navigationScreenNames.profileStack, {
      screen: navigationScreenNames.myProfile,
      params: {
        isFinishedDataUpdate: false,
      },
    });
  };

  const hasDifferentCurrentEmail = (value: string) => {
    if (email !== value) return true;
    return false;
  };

  const checkValidation = (value: string, setErrors: any) => {
    const differentCurrentEmail = hasDifferentCurrentEmail(value);
    if (!differentCurrentEmail) {
      setTimeout(() => {
        const errorMessages = {
          email: i18n.t('email-error-duplicate'),
          emailConfirmation: i18n.t('email-error-duplicate'),
        };
        setErrors(errorMessages);
      }, 100);
    }
    setIsButtonEnabled(differentCurrentEmail);
  };

  const submitEmail = async (data: any, helpers: FormikHelpers<FormValues>) => {
    setIsButtonEnabled(false);

    const valueForUpdateEmail = {
      email: data.email,
      emailConfirmation: data.emailConfirmation,
    };

    try {
      await UpdateEmail(valueForUpdateEmail.email);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Profile/ChangeEmail/NewEmail/hooks/useNewEmail.tsx',
        service: 'AuthServices.UpdateEmail',
        error,
      });

      const errorMessages = {
        email: i18n.t('email-error-duplicate'),
        emailConfirmation: i18n.t('email-error-duplicate'),
      };

      if (error?.response?.data?.description === CODE_ERROR_EMAIL_DUPLICATED) {
        helpers.setErrors(errorMessages);
      } else {
        navigation.navigate(navigationScreenNames.personalChangeDataNotAvailable);
      }
      return;
    }

    try {
      await waitForChallenge?.();
      setIsButtonEnabled(true);

      navigation.navigate(navigationScreenNames.verifyOTP, {
        destination: data.emailConfirmation,
        stack: 'email',
        isChangeDataProcess: true,
      });
    } catch (error) {
      if (error instanceof ChallengeClosed) {
        navigation.navigate(navigationScreenNames.home);
      } else {
        setIsButtonEnabled(true);
      }
    }
  };

  return {
    onPressBackArrow,
    submitEmail,
    checkValidation,
    email,
    isButtonEnabled,
  };
};

export default useNewEmail;
