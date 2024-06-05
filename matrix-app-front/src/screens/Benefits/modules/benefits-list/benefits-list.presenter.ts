import { useEffect, useState } from 'react';
import { logCrashlytics } from 'src/utils/Analytics';
import { SlideProps } from 'src/screens/Benefits/shared/interfaces/benefits-list.interfaces';
import useBenefitsListInteractor from 'src/screens/Benefits/modules/benefits-list/benefits-list.interactor';
import {
  analyticsManagerProvider,
  AnalyticsProviderType,
} from 'src/shared/providers/analytics/index';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';

const selectItemSlider = (sliderItem: SlideProps, groupName: string) => {
  analyticsManagerProvider.logEventWithType(
    {
      tipoZona: 'Beneficios',
      zona: 'VerBeneficios',
      subZona: 'ListaBeneficios',
      seccion: groupName,
      tipoEvento: 'Visualización',
      tipoElemento: 'Beneficio',
      valor: sliderItem.partnerName,
    },
    AnalyticsProviderType.firebase,
    'virtualEventApp31',
  );
};

const useBenefitsData = () => {
  const [benefitsList, setBenefitsList] = useState<IObtainBenefits>();
  const [loading, setLoading] = useState<boolean>(false);
  const benefitsListInteractor = useBenefitsListInteractor();

  const getBenefits = async () => {
    try {
      setLoading(true);
      const benefits = await benefitsListInteractor.executeObtainBenefits();
      setBenefitsList(benefits);
    } catch (error) {
      logCrashlytics({
        scope: 'API',
        fileName: 'Benefits/hooks/useBenefitsData.ts',
        service: 'getBenefits',
        error,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBenefits();
  }, []);

  return { benefitsList, loading, selectItemSlider };
};

export default useBenefitsData;
