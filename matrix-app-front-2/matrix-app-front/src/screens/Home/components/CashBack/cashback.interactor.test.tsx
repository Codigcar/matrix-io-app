import { logCrashlytics } from 'src/utils/Analytics';
import { IUseCase } from 'src/core/contracts/use-case.interface';
import IObtainCashback from 'src/core/modules/cashback/dtos/obtain-cashback';
import IObtainCashbackRule from 'src/core/modules/cashback/dtos/obtain-rules';
import useCashbackInteractor from './cashback.interactor';

jest.mock('src/utils/Analytics');

describe('useCashbackInteractor', () => {
  let mockObtainCashbackUseCase: IUseCase<void, IObtainCashback> | undefined;
  let mockObtainCashbackRuleUseCase: IUseCase<void, IObtainCashbackRule> | undefined;

  beforeEach(() => {
    mockObtainCashbackUseCase = {
      execute: jest.fn(),
      repository: {},
    };
    mockObtainCashbackRuleUseCase = {
      execute: jest.fn(),
      repository: {},
    };
  });

  it('successfully executes getCashback', async () => {
    const mockData = {};
    mockObtainCashbackUseCase.execute.mockResolvedValue(mockData);
    const interactor = useCashbackInteractor(
      mockObtainCashbackUseCase,
      mockObtainCashbackRuleUseCase,
    );

    const result = await interactor.executeGetCashback();

    expect(result).toEqual(mockData);
    expect(mockObtainCashbackUseCase.execute).toHaveBeenCalled();
  });

  it('handles error in getCashback', async () => {
    const mockError = new Error('Test error');
    mockObtainCashbackUseCase.execute.mockRejectedValue(mockError);
    const interactor = useCashbackInteractor(
      mockObtainCashbackUseCase,
      mockObtainCashbackRuleUseCase,
    );

    await expect(interactor.executeGetCashback()).rejects.toThrow(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'CashBack/cashback.interactor.tsx',
      service: 'ObtainCashback',
      error: mockError,
    });
  });

  it('successfully executes getCashbackRule', async () => {
    const mockData = {};
    mockObtainCashbackRuleUseCase.execute.mockResolvedValue(mockData);
    const interactor = useCashbackInteractor(
      mockObtainCashbackUseCase,
      mockObtainCashbackRuleUseCase,
    );

    const result = await interactor.executeGetCashbackRule();

    expect(result).toEqual(mockData);
    expect(mockObtainCashbackRuleUseCase.execute).toHaveBeenCalled();
  });

  it('handles error in getCashbackRule', async () => {
    const mockError = new Error('Test error');
    mockObtainCashbackRuleUseCase.execute.mockRejectedValue(mockError);
    const interactor = useCashbackInteractor(
      mockObtainCashbackUseCase,
      mockObtainCashbackRuleUseCase,
    );

    await expect(interactor.executeGetCashbackRule()).rejects.toThrow(mockError);
    expect(logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'CashBack/cashback.interactor.tsx',
      service: 'ObtainCashbackRule',
      error: mockError,
    });
  });
});
