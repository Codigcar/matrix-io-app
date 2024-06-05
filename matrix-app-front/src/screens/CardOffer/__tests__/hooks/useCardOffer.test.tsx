/* eslint-disable no-promise-executor-return */
/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { onboardingStates } from 'src/utils/eventsHandler/eventList';
import useCardOffer, { AlreadyWithOffer } from '../../hooks/useCardOffer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('src/api/Onboarding', () => ({
  onboardingSummary: jest.fn(),
}));
jest.mock('src/api/CardOfferServices', () => ({
  getUserOffers: jest.fn(),
  submitContract: jest.fn(),
  getSummarySheet: jest.fn(),
}));

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
  logVirtualEventAnalytics: jest.fn(),
  setAnalyticRoute: jest.fn(),
}));

jest.mock('src/utils/polling', () => jest.fn());
jest.mock('usehooks-ts', () => ({
  useInterval: jest.fn(),
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('useCardOffer Hook Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle loadingOffer analytics when loading type is "loadingOffer"', () => {
    const { result, rerender } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    act(() => {
      result.current.setLoading({ type: 'loadingOffer' });
      rerender();
    });

    expect(result.current.loading.type).toBe('loadingOffer');
  });

  it('should handle warning analytics when loading type is "warning"', () => {
    const { result, rerender } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    act(() => {
      result.current.setLoading({ type: 'warning' });
      rerender();
    });

    expect(result.current.loading.type).toBe('warning');
  });

  it('should handle error analytics when loading type is "error"', () => {
    const { result, rerender } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    act(() => {
      result.current.setLoading({ type: 'error' });
      rerender();
    });

    expect(result.current.loading.type).toBe('error');
  });

  it('should handle loadingComplete analytics when loading type is "loadingComplete"', () => {
    const { result, rerender } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    act(() => {
      result.current.setLoading({ type: 'loadingComplete' });
      rerender();
    });

    expect(result.current.loading.type).toBe('loadingComplete');
  });

  it('should handle AlreadyWithOffer error and analytics', async () => {
    const { result } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    result.current.submitCardContract = jest.fn().mockRejectedValueOnce(new AlreadyWithOffer());

    await act(async () => {
      result.current.startPolling();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading.type).toBe('loadingOffer');
  });

  it('should handle submitCardContract error and analytics', async () => {
    const { result } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    const mockError = new Error('Submission error');
    result.current.submitCardContract = jest.fn().mockRejectedValueOnce(mockError);

    await act(async () => {
      result.current.startPolling();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading.type).toBe('loadingOffer');
  });

  it('should handle successful onboarding completion and navigate to cardOfferComplete', async () => {
    const { result } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    jest
      .spyOn(require('src/api/Onboarding'), 'onboardingSummary')
      .mockResolvedValueOnce({ status: onboardingStates.onboardingCompleted });

    await act(async () => {
      result.current.getState();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading.visible).toBe(false);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(navigationScreenNames.cardOfferComplete);

    expect(require('src/api/Onboarding').onboardingSummary).toHaveBeenCalled();
  });

  it('should handle onboarding failure and show warning', async () => {
    const { result } = renderHook(() => useCardOffer({ navigation: mockNavigation }));

    jest
      .spyOn(require('src/api/Onboarding'), 'onboardingSummary')
      .mockResolvedValueOnce({ status: onboardingStates.contractFailed });

    await act(async () => {
      result.current.getState();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading.type).toBe('warning');
  });
});
