import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';

interface ModalSoonAnalyticsInterface {
  onOpenCashback: () => void;
}

const ModalSoonAnalytics: ModalSoonAnalyticsInterface = {
  onOpenCashback: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Éxito',
      tipoEvento: 'Click',
      tipoElemento: 'Botón',
      valor: 'Cashback',
    }, AnalyticsProviderType.firebase, 'virtualEventApp35');
  },
};
export default ModalSoonAnalytics;
