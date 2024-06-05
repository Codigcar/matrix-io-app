import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { API_KEY_CULQUI } from 'src/utils/constants';
import { i18n } from 'src/utils/core/MTXStrings';
import { CardPaymentRoutesEnum } from 'src/shared/enums/routes/card-payment-routes.enum';
import { useErrorsValidation } from '../../shared/hooks';

export const AddDebitCardCulqiPresenter = () => {
  const navigation:any = useNavigation();
  const [token, setToken] = useState<any>({});
  const { handleError } = useErrorsValidation(navigation.navigate);
  const html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1.0" user-scalable="0" />
    </head>
      <body>
      <style>
          iframe {
            background-color: rgba(255, 255, 255, 0)!important;
          }
        </style>
        <script src="https://checkout.culqi.com/js/v4"></script>
        <script>
          Culqi.publicKey = "${API_KEY_CULQUI}";
          Culqi.settings({
            title: "io.pe",
            currency: "PEN"
          });
          Culqi.options({
            lang: "es",
            installments: false,
            paymentMethods: {
              tarjeta: true,
              yape: false, 
              bancaMovil: false,
              agente: false,
              billetera: false,
              cuotealo: false,
            },
            style: {
              logo: "https://culqi.com/assets/images/brand/culqi-logo.png?v=1",
              buttonText: "${i18n.t('paymentMethod.add-payment-method')}"
            },
          });
          function culqi() {
            if (Culqi.token) {
              const token = Culqi.token.id;
              window.ReactNativeWebView.postMessage(JSON.stringify({token}));
            } else {
              window.ReactNativeWebView.postMessage(JSON.stringify({error: Culqi.error}));
            }
          }
          Culqi.open();
        </script>
      </body>
    </html>  
    `;

  useEffect(() => {
    if (token?.error) {
      handleError({ code: token.error.code, type: 'METODOS_DE_PAGOS' });
    }
    if (token?.token) {
      navigation.navigate(CardPaymentRoutesEnum.ADDING_PAYMENT_METHOD, { token });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return {
    setToken,
    html,
  };
};
