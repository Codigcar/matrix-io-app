import dtoToObtainBenefits from 'src/core/modules/benefits/domain/mappers/obtain-benefits.deserialize'; // Asegúrate de cambiar esto por la ruta correcta a tu archivo
import { ObtainBenefitsDto } from 'src/core/modules/benefits/dtos/obtain-benefits.dto';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';

describe('dtoToObtainBenefits', () => {
  it('should correctly transform ObtainBenefitsDto into IObtainBenefits', () => {
    const mockDto: ObtainBenefitsDto = {
      coupons: {
        categoryList: [
          {
            qty: 1,
            name: 'Categoría 1',
            list: [
              {
                id: '1',
                imgPath: 'ruta-imagen-1',
                benefit: 'Beneficio 1',
                benefitValue: 10,
                partnerName: 'Socio 1',
                offerTitle: 'Oferta 1',
                category: 'Categoría 1',
              },
            ],
          },
        ],
      },
    };

    const expectedOutput: IObtainBenefits = {
      coupons: {
        categoryList: [
          {
            qty: 1,
            name: 'Categoría 1',
            list: [
              {
                id: '1',
                imgPath: 'ruta-imagen-1',
                benefit: 'Beneficio 1',
                benefitValue: 10,
                partnerName: 'Socio 1',
                offerTitle: 'Oferta 1',
                category: 'Categoría 1',
              },
            ],
          },
        ],
      },
    };

    const result = dtoToObtainBenefits(mockDto);
    expect(result).toEqual(expectedOutput);
  });

  it('should handle invalid input data', () => {
    const invalidDto: any = {
      coupons: {
        categoryList: [
          {
            qty: 'no es un número',
            name: 123,
            list: [
              {
                id: '1',
                benefit: 'Beneficio 1',
                benefitValue: 10,
                partnerName: 'Socio 1',
                offerTitle: 'Oferta 1',
                category: 'Categoría 1',
              },
            ],
          },
        ],
      },
    };

    const result = dtoToObtainBenefits(invalidDto);
    expect(result).toEqual({} as IObtainBenefits);
  });
});
