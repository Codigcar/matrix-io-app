import React, { useEffect, useState } from 'react';
import { Box, Container } from 'matrix-ui-components';
import { NavigationPropsType } from 'src/types/types';
import { i18n } from 'src/utils/core/MTXStrings';
import { WebView } from 'react-native-webview';
import { API_KEY_CULQUI } from 'src/utils/constants';
import BackgroundWrapper from 'src/utils/core/Wrapper/BackgroundWrapper';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useErrorsValidation from './hooks/useErrorsValidation';

const AddDebitCardCulqi: React.FC<NavigationPropsType> = ({ navigation }) => {
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
      navigation.navigate(navigationScreenNames.addingPaymentMethod, { token });
    }
  }, [token]);

  return (
    <BackgroundWrapper>
      <Container
        withInput
        imageBackground="none"
        hasGradient={false}
        isHeaderVisible
        isScrollable
        goBackNavigate={() => navigation.goBack()}
        headerTitle={i18n.t('paymentMethod.title')}
      >
        <Box flex={1} pt="spacing-m">
          <WebView
            testID="webviewAddDebitCardCulqi"
            onMessage={(event: any) => {
              setToken(JSON.parse(event.nativeEvent.data));
            }}
            source={{ html }}
          />
        </Box>
      </Container>
    </BackgroundWrapper>
  );
};
export default AddDebitCardCulqi;
