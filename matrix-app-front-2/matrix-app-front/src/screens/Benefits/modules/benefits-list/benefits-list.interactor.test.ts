import { renderHook, act } from '@testing-library/react-hooks';
import useBenefitsListInteractor from 'src/screens/Benefits/modules/benefits-list/benefits-list.interactor';
import { logCrashlytics } from 'src/utils/Analytics';
import ObtainBenefitsUseCase from 'src/core/modules/benefits/domain/use-case/obtain-benefits.use-case';

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
}));

jest.mock('src/core/modules/benefits/domain/use-case/obtain-benefits.use-case', () =>
  jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue({}),
  })));

describe('useBenefitsListInteractor', () => {
  it('should should get the benefits correctly', async () => {
    const { result } = renderHook(() => useBenefitsListInteractor());
    await act(async () => {
      const benefits = await result.current.executeObtainBenefits();
      expect(benefits).toBeDefined();
    });
  });

  it('should should handle errors and log them in Crashlytics', async () => {
    ObtainBenefitsUseCase.mockImplementation(() => ({
      execute: jest.fn().mockRejectedValue(new Error('Failed to obtain benefits')),
    }));
    const { result } = renderHook(() => useBenefitsListInteractor());
    await act(async () => {
      expect(result.current.executeObtainBenefits()).rejects.toThrow('Failed to obtain benefits');
    });
    expect(logCrashlytics).toHaveBeenCalledWith(expect.any(Object));
  });
});
