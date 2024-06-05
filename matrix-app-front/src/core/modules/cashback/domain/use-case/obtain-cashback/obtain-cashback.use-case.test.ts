import ObtainCashbackUseCase from 'src/core/modules/cashback/domain/use-case/obtain-cashback/obtain-cashback.use-case';
import { ICashbackRepository } from 'src/core/modules/cashback/repository/cashback.repository';
import { ObtainCashbackDto } from 'src/core/modules/cashback/dtos/obtain-cashback/obtain-cashback.dto';
import dtoToObtainCashback from 'src/core/modules/cashback/domain/mappers/obtain-cashback/deserialize/obtain-cashback.deserialize';

// Mock del repositorio
jest.mock('src/core/modules/cashback/repository/cashback.repository');

describe('ObtainCashbackUseCase', () => {
  let obtainCashbackUseCase: ObtainCashbackUseCase;
  let mockCashbackRepository: jest.Mocked<ICashbackRepository>;

  beforeEach(() => {
    mockCashbackRepository = {
      obtainCashback: jest.fn(),
    } as any;
    obtainCashbackUseCase = new ObtainCashbackUseCase(mockCashbackRepository);
  });

  test('should call repository obtainCashback and return the result from dtoToObtainCashback', async () => {
    const mockDtoResponse: ObtainCashbackDto = [{
      account: 'accountValue',
      pointsBalance: '100',
      pointsExchangeRate: '0.5',
      pointsAmount: '50',
      expiryDate: '2023-12-31',
    }];

    mockCashbackRepository.obtainCashback.mockResolvedValueOnce(mockDtoResponse);

    const result = await obtainCashbackUseCase.execute();

    expect(mockCashbackRepository.obtainCashback).toHaveBeenCalled();
    expect(result).toEqual(dtoToObtainCashback(mockDtoResponse));
  });
});
