import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';

const ErrorValues = {
  warning: {
    onFinishError: {
      seccion: 'Error1',
      valor: 'No pudimos abonar el cashback a tu tarjeta iO',
      name: 'verFinalizadoErrorIOCashback',
    },
    onUnderstoodError: {
      seccion: 'Error1',
      valor: 'Entendido',
      name: 'botonFinalizadoErrorIOCashback',
    },
  },
  error: {
    onFinishError: {
      seccion: 'Error2',
      valor: 'No pudimos abonar el cashback a tu tarjeta iO',
      name: 'verFinalizadoErrorCashback',
    },
    onUnderstoodError: {
      seccion: 'Error2',
      valor: 'Finalizar',
      name: 'botonFinalizadoErrorCashback',
    },
  },
};

interface RedemptionAnalyticsInterface {
  onGoBack: () => void;
  onPayIoCard: () => void;
  onErrorExceedsAmmount: () => void;
  onErrorMinimumAmmount: () => void;
  onProcessingCashback: () => void;
  onRedemptionSuccess: () => void;
  onGoToStart: () => void;
  onFinishError: (type: keyof typeof ErrorValues) => void;
  onUnderstoodError: (type: keyof typeof ErrorValues) => void;
}

const RedemptionAnalytics: RedemptionAnalyticsInterface = {
  onGoBack: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'IngresarMonto',
      seccion: 'None',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Atras',
    }, AnalyticsProviderType.firebase, 'atrasIngresarMontoAbono');
  },
  onPayIoCard: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'IngresarMonto',
      seccion: 'None',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Pagar mi tarjeta IO',
    }, AnalyticsProviderType.firebase, 'ingresarMontoAbono');
  },
  onErrorExceedsAmmount: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'IngresarMonto',
      seccion: 'Error1',
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Error',
      valor: 'Ingresa un monto que no exceda el saldo disponible',
    }, AnalyticsProviderType.firebase, 'errorExcesoIngresarMontoAbono');
  },
  onErrorMinimumAmmount: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'IngresarMonto',
      seccion: 'Error2',
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Error',
      valor: 'El monto minimo a abonar es S/. 10.00',
    }, AnalyticsProviderType.firebase, 'errorMinimoIngresarMontoAbono');
  },
  onProcessingCashback: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'Procesando',
      seccion: 'None',
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Pantalla',
      valor: 'Estamos completando tu abono',
    }, AnalyticsProviderType.firebase, 'procesandoCashback');
  },
  onRedemptionSuccess: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'Finalizado',
      seccion: 'Exito',
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Pantalla',
      valor: 'Tu abono se realizo con exito',
    }, AnalyticsProviderType.firebase, 'verFinalizadoExitoCashback');
  },
  onGoToStart: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'Finalizado',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Ir a inicio',
    }, AnalyticsProviderType.firebase, 'botonFinalizadoExitoCashback');
  },
  onFinishError: (type: keyof typeof ErrorValues) => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'Finalizado',
      seccion: ErrorValues[type].onFinishError.seccion,
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Pantalla',
      valor: ErrorValues[type].onFinishError.valor,
    }, AnalyticsProviderType.firebase, ErrorValues[type].onFinishError.name);
  },
  onUnderstoodError: (type: keyof typeof ErrorValues) => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Abono',
      subZona: 'Finalizado',
      seccion: ErrorValues[type].onUnderstoodError.seccion,
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: ErrorValues[type].onUnderstoodError.valor,
    }, AnalyticsProviderType.firebase, ErrorValues[type].onUnderstoodError.name);
  },
};
export default RedemptionAnalytics;
