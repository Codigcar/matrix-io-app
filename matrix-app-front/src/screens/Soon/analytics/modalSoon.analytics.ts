import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';

interface ModalSoonAnalyticsInterface {
  onOpenCashback: () => void;
  onShowModal: () => void;
  onCloseModal: () => void;
  onUseCashback: () => void;
}

const ModalSoonAnalytics: ModalSoonAnalyticsInterface = {
  onOpenCashback: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Exito',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Cashback',
    }, AnalyticsProviderType.firebase, 'clickBotonCashback');
  },
  onShowModal: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Modal',
      tipoEvento: 'Visualizacion',
      tipoElemento: 'Modal',
      valor: 'Que es Cashback',
    }, AnalyticsProviderType.firebase, 'verModalQueEsCashback');
  },
  onCloseModal: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Modal',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'x',
    }, AnalyticsProviderType.firebase, 'cerrarModalQueEsCashback');
  },
  onUseCashback: () => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Perfil',
      zona: 'Inicio',
      subZona: 'Configuracion',
      seccion: 'Modal',
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: 'Usar mi Cashback',
    }, AnalyticsProviderType.firebase, 'usarBotonModalQueEsCashback');
  }
};
export default ModalSoonAnalytics;
