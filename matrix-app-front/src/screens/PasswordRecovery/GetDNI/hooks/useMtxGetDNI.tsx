import { useContext, useEffect } from 'react';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { changeUserForId } from 'src/utils/auth/dataHandler';
import { amplifyErrorCodes } from 'src/utils/auth/errorList';
import { ForgotPassword } from 'src/api/AuthServices';
import UseCheckNetworkConnection from 'src/utils/hooks/UseCheckNetworkConnection';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { logCrashlytics, setAnalyticRoute } from 'src/utils/Analytics';
import { FormikHelpers } from 'formik';
import { FormValues } from 'src/components/Form/form.props';
import { ReCaptchaContext } from 'src/screens/auth/providers/recaptcha-v3';
import useReCaptchaModalError from 'src/screens/auth/components/AuthModalError/use-auth-modal-error';
import { ScreenCurrentEnum } from 'src/utils/enum/error-type.enum';

const useMTXGetDNI = (props: NavigationPropsType) => {
  const IsNetworkConnected = UseCheckNetworkConnection();
  const ReCaptcha = useContext(ReCaptchaContext);
  const sessionModalError = useReCaptchaModalError();

  const { navigation } = props;

  const onPressBackArrow = () => {
    navigation.goBack();
  };

  const isEmail = (deliveryMedium: string) => (deliveryMedium === 'SMS' ? 'celular' : 'correo');

  useEffect(() => {
    ReCaptcha.actionForgotPassword();
  });

  const requestCode: (
    username: string,
    document: string,
    helpers: FormikHelpers<FormValues>,
  ) => Promise<void> = async (username, document, helpers) => {
    helpers.setSubmitting(true);
    const recaptchaToken = await ReCaptcha.invokeReCaptchaSessionToken();
    if (recaptchaToken) {
      try {
        const response = await ForgotPassword(username, { session: recaptchaToken });
        if (response?.CodeDeliveryDetails) {
          navigation.navigate('VerifyOTP', {
            destination: isEmail(response?.CodeDeliveryDetails?.DeliveryMedium || 'EMAIL'),
            documentNumber: document,
          });
          setAnalyticRoute('VerifyOTPRecovery');
        }
      } catch (error: any) {
        if (error?.code) {
          sessionModalError.showModalError(error?.code, ScreenCurrentEnum.SIGN_UP);
        } else {
          logCrashlytics({
            scope: 'API',
            fileName: 'PasswordRecovery/GetDNI/hooks/useMtxGetDNI.tsx',
            service: 'ForgotPassword',
            error,
          });
          if (error instanceof Error) {
            if (error.name === amplifyErrorCodes.exceededRequestOTP) {
              navigation.navigate('VerifyOTP', { isBlocked: true });
            } else if (error) {
              helpers.setErrors({
                dni: i18n.t('recoveryPassword-getDNI-error'),
              });
            }
          }
        }
      } finally {
        helpers.setSubmitting(false);
      }
    } else {
      helpers.setSubmitting(true);
    }
  };

  const onPressSubmitButton = async (data: any, helper: FormikHelpers<FormValues>) => {
    if (!IsNetworkConnected) {
      navigation.navigate(navigationScreenNames.networkError);
      return;
    }
    const { dni } = data;
    const userId = await changeUserForId(dni);
    if (userId) await requestCode(userId, dni, helper);
    else await requestCode(dni, dni, helper);
  };

  return {
    onPressBackArrow,
    onPressSubmitButton,
  };
};

export default useMTXGetDNI;
