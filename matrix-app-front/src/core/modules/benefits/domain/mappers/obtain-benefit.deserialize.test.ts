import dtoToObtainBenefit from 'src/core/modules/benefits/domain/mappers/obtain-benefit.deserialize'; // Cambia esto por la ruta correcta
import { ObtainBenefitDto } from 'src/core/modules/benefits/dtos/obtain-benefit.dto';
import IObtainBenefit from 'src/core/modules/benefits/dtos/obtain-benefit';

describe('dtoToObtainBenefit', () => {
  it('should correctly transform ObtainBenefitDto into IObtainBenefit', () => {
    const mockDto: ObtainBenefitDto = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 'ruta-interna-imagen',
          imgPathLogo: 'ruta-logo',
          benefit: 'Beneficio',
          channel: ['Canal 1', 'Canal 2'],
          offerTitle: 'Título de la Oferta',
          benefitDetail: 'Detalle del Beneficio',
          benefitUse: 'Uso del Beneficio',
          codeIO: 'CódigoIO',
          period: 'Período',
          partnerName: 'Nombre del Socio',
          category: 'Categoría',
          termsConditions: 'Términos y Condiciones',
          localAppliesDiscount: [
            {
              local: 'Local 1',
              location: 'Ubicación 1',
            },
            {
              local: 'Local 2',
              location: 'Ubicación 2',
            },
          ],
        },
      },
    };

    const expectedOutput: IObtainBenefit = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 'ruta-interna-imagen',
          imgPathLogo: 'ruta-logo',
          benefit: 'Beneficio',
          channel: ['Canal 1', 'Canal 2'],
          offerTitle: 'Título de la Oferta',
          benefitDetail: 'Detalle del Beneficio',
          benefitUse: 'Uso del Beneficio',
          codeIO: 'CódigoIO',
          period: 'Período',
          partnerName: 'Nombre del Socio',
          category: 'Categoría',
          termsConditions: 'Términos y Condiciones',
          localAppliesDiscount: [
            {
              local: 'Local 1',
              location: 'Ubicación 1',
            },
            {
              local: 'Local 2',
              location: 'Ubicación 2',
            },
          ],
        },
      },
    };

    const result = dtoToObtainBenefit(mockDto);
    expect(result).toEqual(expectedOutput);
  });

  it('should correctly transform ObtainBenefitDto into IObtainBenefit, when localAppliesDiscount is not an array', () => {
    const mockDto: ObtainBenefitDto = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 'ruta-interna-imagen',
          imgPathLogo: 'ruta-logo',
          benefit: 'Beneficio',
          channel: ['Canal 1', 'Canal 2'],
          offerTitle: 'Título de la Oferta',
          benefitDetail: 'Detalle del Beneficio',
          benefitUse: 'Uso del Beneficio',
          codeIO: 'CódigoIO',
          period: 'Período',
          partnerName: 'Nombre del Socio',
          category: 'Categoría',
          termsConditions: 'Términos y Condiciones',
          localAppliesDiscount: '',
        },
      },
    };

    const expectedOutput: IObtainBenefit = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 'ruta-interna-imagen',
          imgPathLogo: 'ruta-logo',
          benefit: 'Beneficio',
          channel: ['Canal 1', 'Canal 2'],
          offerTitle: 'Título de la Oferta',
          benefitDetail: 'Detalle del Beneficio',
          benefitUse: 'Uso del Beneficio',
          codeIO: 'CódigoIO',
          period: 'Período',
          partnerName: 'Nombre del Socio',
          category: 'Categoría',
          termsConditions: 'Términos y Condiciones',
          localAppliesDiscount: '',
        },
      },
    };

    const result = dtoToObtainBenefit(mockDto);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle invalid input data', () => {
    const invalidDto: any = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 123,
        },
      },
    };

    const result = dtoToObtainBenefit(invalidDto);
    expect(result).toEqual({} as IObtainBenefit);
  });
});
