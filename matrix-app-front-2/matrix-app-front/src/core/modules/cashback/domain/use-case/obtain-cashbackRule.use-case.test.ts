import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import ObtainCashbackRuleUseCase from './obtain-cashbackRule.use-case';
import dtoToObtainCashbackRule from '../mappers/obtain-cashback/obtain-cashback-deserialize/obtain-cashback-rule.deserialize';

jest.mock('../mappers/obtain-cashback/obtain-cashback-deserialize/obtain-cashback-rule.deserialize');

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
