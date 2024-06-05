import { analyticsManagerProvider, AnalyticsProviderType } from 'src/shared/providers/analytics/index';

interface BenefitsAnalyticsInterface {
  onSelectItem: (groupName: string, partnerName: string | undefined) => void;
}

const BenefitsAnalytics: BenefitsAnalyticsInterface = {
  onSelectItem: (groupName: string, partnerName: string | undefined) => {
    analyticsManagerProvider.logEventWithType({
      tipoZona: 'Beneficios',
      zona: 'VerBeneficios',
      subZona: 'ListaBeneficios',
      seccion: groupName,
      tipoEvento: 'Visualización',
      tipoElemento: 'Beneficio',
      valor: partnerName,
    }, AnalyticsProviderType.firebase, 'virtualEventApp31');
  },
};
export default BenefitsAnalytics;
