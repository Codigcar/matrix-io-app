import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import ObtainCashbackRuleUseCase from 'src/core/modules/cashback/domain/use-case/obtain-cashback-rule/obtain-cashbackRule.use-case';
import dtoToObtainCashbackRule from 'src/core/modules/cashback/domain/mappers/obtain-cashback-rule/deserialize/obtain-cashback-rule.deserialize';

jest.mock('src/core/modules/cashback/domain/mappers/obtain-cashback-rule/deserialize/obtain-cashback-rule.deserialize');

describe('ObtainCashbackRuleUseCase', () => {
  let useCase: ObtainCashbackRuleUseCase;
  let mockRepository: ICashbackRepository;

  beforeEach(() => {
    mockRepository = {
      obtainCashbackRule: jest.fn(),
    };
    useCase = new ObtainCashbackRuleUseCase(mockRepository);
  });

  it('executes and returns transformed data', async () => {
    const mockResponse = {};
    const expectedOutput = {};

    mockRepository.obtainCashbackRule.mockResolvedValue(mockResponse);
    dtoToObtainCashbackRule.mockReturnValue(expectedOutput);

    const result = await useCase.execute();

    expect(mockRepository.obtainCashbackRule).toHaveBeenCalled();
    expect(dtoToObtainCashbackRule).toHaveBeenCalledWith(mockResponse);
    expect(result).toEqual(expectedOutput);
  });
});
