import BenefitsProvider from 'src/core/modules/benefits/infraestructure/driver-adapter/benefits.provider';
import HttpImplementation from 'src/core/libraries-implementation/http/http.implementation';
import { ObtainBenefitsDto } from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import { ObtainBenefitDto } from 'src/core/modules/benefits/dtos/obtain-benefit.dto';
import ServicesInstanceEnum from 'src/shared/enums/services-instance.enum';
import ServicesEnum from 'src/shared/enums/services.enum';
import ConstantsEnum from 'src/shared/enums/constants.enum';

jest.mock('src/core/libraries-implementation/http/http.implementation');

describe('BenefitsProvider', () => {
  let benefitsProvider: BenefitsProvider;
  let mockHttpImplementation: jest.Mocked<HttpImplementation>;

  beforeEach(() => {
    mockHttpImplementation = new HttpImplementation() as any;
    benefitsProvider = new BenefitsProvider();
    benefitsProvider.httpImpl = mockHttpImplementation;
  });

  it('should return benefits correctly', async () => {
    const mockData: ObtainBenefitsDto = {
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
    mockHttpImplementation.get.mockResolvedValue(mockData);

    const result = await benefitsProvider.obtainBenefits();

    expect(mockHttpImplementation.get).toHaveBeenCalledWith(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_BENEFITS,
      ConstantsEnum.JSON,
    );
    expect(result).toEqual(mockData);
  });

  it('should get a specific benefit correctly', async () => {
    const mockData: ObtainBenefitDto = {
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
    const id = 'benefit-id';
    mockHttpImplementation.get.mockResolvedValue(mockData);

    const result = await benefitsProvider.obtainBenefit(id);

    expect(mockHttpImplementation.get).toHaveBeenCalledWith(
      ServicesInstanceEnum.API_INSTANCE,
      ServicesEnum.OBTAIN_BENEFITS + id,
      ConstantsEnum.JSON,
    );
    expect(result).toEqual(mockData);
  });
});
