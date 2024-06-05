import ObtainBenefitUseCase from 'src/core/modules/benefits/domain/use-case/obtain-benefit.use-case';
import { IBenefitsRepository } from 'src/core/modules/benefits/repository/benefits.repository';
import IObtainBenefit from 'src/core/modules/benefits/dtos/obtain-benefit';

const mockRepository: IBenefitsRepository = {
  obtainBenefit: jest.fn(),
  obtainBenefits: jest.fn(),
};

describe('ObtainBenefitUseCase', () => {
  it('should get a profit and transform it correctly', async () => {
    const id = 'id-de-prueba';
    const expectedBenefit: IObtainBenefit = {};
    mockRepository.obtainBenefit.mockResolvedValueOnce();
    const useCase = new ObtainBenefitUseCase(mockRepository);
    const result = await useCase.execute(id);
    expect(mockRepository.obtainBenefit).toHaveBeenCalledWith(id);
    expect(result).toEqual(expectedBenefit);
  });

  it('should handle repository errors', async () => {
    const id = 'id-erróneo';
    mockRepository.obtainBenefit.mockRejectedValueOnce(new Error('Error al obtener beneficio'));
    const useCase = new ObtainBenefitUseCase(mockRepository);
    await expect(useCase.execute(id)).rejects.toThrow('Error al obtener beneficio');
  });

  it('should process different responses from the repository', async () => {
    const id = 'id-variado';
    const variedResponse = {};
    mockRepository.obtainBenefit.mockResolvedValueOnce(variedResponse);
    const useCase = new ObtainBenefitUseCase(mockRepository);
    const result = await useCase.execute(id);
    expect(result).toEqual({});
  });

  it('should handle invalid IDs correctly', async () => {
    const invalidId = null;
    mockRepository.obtainBenefit.mockResolvedValueOnce();
    const useCase = new ObtainBenefitUseCase(mockRepository);
    const result = await useCase.execute(invalidId);
    expect(result).toEqual({});
  });
});
