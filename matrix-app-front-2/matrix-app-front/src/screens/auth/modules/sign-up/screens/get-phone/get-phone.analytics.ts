import { logCrashlytics, logVirtualEventAnalytics } from 'src/utils/Analytics';

export const logCrashlyticsSignUp = (error: any) => {
  logCrashlytics({
    scope: 'API',
    fileName: 'auth/enrollment/screens/get-phone/get-phone.analytics.ts',
    service: 'AwsAmplify signUp',
    error,
  });
};

export const logClickEvent = () =>
  logVirtualEventAnalytics({
    eventName: 'virtualEventApp05',
    seccion: 'Exito',
    tipoEvento: 'Click',
    tipoElemento: 'Boton',
    valor: 'Continuar',
  });
