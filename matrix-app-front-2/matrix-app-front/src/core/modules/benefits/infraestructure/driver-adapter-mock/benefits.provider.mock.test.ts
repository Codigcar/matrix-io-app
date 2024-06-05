import BenefitsProviderMock from 'src/core/modules/benefits/infraestructure/driver-adapter-mock/benefits.provider.mock'; // Cambia esto por la ruta correcta
import { ObtainBenefitsDto } from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import { ObtainBenefitDto } from 'src/core/modules/benefits/dtos/obtain-benefit.dto';

describe('BenefitsProviderMock', () => {
  let benefitsProviderMock: BenefitsProviderMock;

  beforeEach(() => {
    benefitsProviderMock = new BenefitsProviderMock();
  });

  it('should return the expected benefits', async () => {
    const expectedResponse: ObtainBenefitsDto = {
      coupons: {
        categoryList: [
          {
            qty: 1,
            name: 'Restaurantes',
            list: [
              {
                id: 'abc123',
                imgPath: 'path/to/image.png',
                benefit: '10% de descuento',
                benefitValue: 10,
                partnerName: 'Restaurante Ejemplo',
                offerTitle: 'Descuento en cenas',
                category: 'Restaurantes',
              },
            ],
          },
        ],
      },
    };

    const result = await benefitsProviderMock.obtainBenefits();
    expect(result).toEqual(expectedResponse);
  });

  it('should return a specific expected profit', async () => {
    const expectedResponse: ObtainBenefitDto = {
      'coupons-detail': {
        coupon: {
          imgPathInternal: 'path/to/internal/image.png',
          imgPathLogo: 'path/to/logo/image.png',
          benefit: '20% de descuento',
          channel: ['Online', 'In-Store'],
          offerTitle: 'Descuento en toda la tienda',
          benefitDetail: 'Detalles del beneficio aquí',
          benefitUse: 'Usa este código en la caja',
          codeIO: 'CODE123',
          period: '1 de Enero al 31 de Diciembre',
          partnerName: 'Tienda Ejemplo',
          category: 'Retail',
          termsConditions: 'Términos y condiciones aquí',
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
    const id = 'algún-id';

    const result = await benefitsProviderMock.obtainBenefit(id);
    expect(result).toEqual(expectedResponse);
  });
});
