import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';

interface NavigatorsAnalyticsInterface {
  onTabPress: (label: string) => void;
}

const NavigatorsAnalytics: NavigatorsAnalyticsInterface = {
  onTabPress: (label: string) => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Navbar',
      zona: 'Navbar',
      subZona: 'Navbar',
      seccion: 'MenuInferior',
      tipoEvento: 'Click',
      tipoElemento: 'Botón',
      valor: label,
    }, AnalyticsProviderType.firebase, 'virtualEventApp');
  },
};
export default NavigatorsAnalytics;
