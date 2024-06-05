import { act, renderHook } from '@testing-library/react-hooks';
import * as AnalyticsUtils from 'src/utils/Analytics';
import useBenefitDetailsInteractor from 'src/screens/Benefits/modules/benefit-details/benefit-details.interactor';

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
}));

jest.mock('src/core/modules/benefits/infraestructure/factory/benefits.factory', () => ({
  getInstance: jest.fn(),
}));

jest.mock('src/core/modules/clipboard/infraestructure/factory/clipboard.factory', () => ({
  getInstance: jest.fn(),
}));

jest.mock('src/core/modules/clipboard/domain/use-case/copy-text.use-case', () =>
  jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockImplementation(() => {
      throw new Error('Copy failed');
    }),
  })));

describe('useBenefitDetailsInteractor', () => {
  it('should handle errors in executeObtainBenefit and log in Crashlytics', async () => {
    const { result } = renderHook(() => useBenefitDetailsInteractor());
    await act(async () => {
      expect(result.current.executeObtainBenefit('someData')).rejects.toThrow();
    });
    expect(AnalyticsUtils.logCrashlytics).toHaveBeenCalledWith(expect.anything());
  });

  it('should execute executeCopyCode and handle errors correctly', async () => {
    const { result } = renderHook(() => useBenefitDetailsInteractor());
    expect(() => {
      result.current.executeCopyCode('Test text');
    }).toThrow('Copy failed');
    expect(AnalyticsUtils.logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'src/screens/Benefits/modules/benefit-details/benefit-details.interactor.ts',
      service: 'CopyCode',
      error: expect.any(Error),
    });
  });
});
