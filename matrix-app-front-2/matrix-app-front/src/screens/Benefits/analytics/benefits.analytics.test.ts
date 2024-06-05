import { analyticsManagerProvider } from 'src/shared/providers/analytics/index';
import BenefitsAnalytics from './benefits.analytics';

jest.mock('src/shared/providers/analytics/index', () => ({
  analyticsManagerProvider: {
    logEventWithType: jest.fn(),
  },
  AnalyticsProviderType: {
    firebase: 'firebase',
  },
}));

describe('BenefitsAnalytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should: onSelectItem calls logEventWithType with the correct arguments', () => {
    const groupName = 'Grupo de prueba';
    const partnerName = 'Socio de prueba';
    BenefitsAnalytics.onSelectItem(groupName, partnerName);
    expect(analyticsManagerProvider.logEventWithType).toHaveBeenCalledWith(
      {
        tipoZona: 'Beneficios',
        zona: 'VerBeneficios',
        subZona: 'ListaBeneficios',
        seccion: groupName,
        tipoEvento: 'Visualización',
        tipoElemento: 'Beneficio',
        valor: partnerName,
      },
      'firebase',
      'virtualEventApp31',
    );
  });

  it('should - onSelectItem handles partnerName undefined correctly', () => {
    const groupName = 'Grupo de prueba';
    BenefitsAnalytics.onSelectItem(groupName, undefined);
    expect(analyticsManagerProvider.logEventWithType).toHaveBeenCalledWith(
      {
        tipoZona: 'Beneficios',
        zona: 'VerBeneficios',
        subZona: 'ListaBeneficios',
        seccion: groupName,
        tipoEvento: 'Visualización',
        tipoElemento: 'Beneficio',
        valor: undefined,
      },
      'firebase',
      'virtualEventApp31',
    );
  });
});
