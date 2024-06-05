import ObtainBenefitsUseCase from 'src/core/modules/benefits/domain/use-case/obtain-benefits.use-case'; // Cambia esto por la ruta correcta
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import IObtainBenefits from 'src/core/modules/benefits/dtos/obtain-benefits';

const mockRepository: IBenefitsRepository = {
  obtainBenefit: jest.fn(),
  obtainBenefits: jest.fn(),
};

describe('ObtainBenefitsUseCase', () => {
  beforeEach(() => {
    mockRepository.obtainBenefits.mockClear();
  });

  it('should obtain benefits and transform them correctly', async () => {
    const mockObtainBenefitsDto = {};
    const expectedBenefits: IObtainBenefits = {};
    mockRepository.obtainBenefits.mockResolvedValueOnce(mockObtainBenefitsDto);
    const useCase = new ObtainBenefitsUseCase(mockRepository);
    const result = await useCase.execute();
    expect(mockRepository.obtainBenefits).toHaveBeenCalled();
    expect(result).toEqual(expectedBenefits);
  });

  it('should handle repository errors', async () => {
    mockRepository.obtainBenefits.mockRejectedValueOnce(new Error('Error al obtener beneficios'));
    const useCase = new ObtainBenefitsUseCase(mockRepository);
    await expect(useCase.execute()).rejects.toThrow('Error al obtener beneficios');
  });
});
