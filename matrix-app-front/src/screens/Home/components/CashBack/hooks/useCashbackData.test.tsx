import { renderHook, act } from '@testing-library/react-hooks';
import HomeServices from 'src/api/HomeServices';
import useCashbackData from './useCashbackData';

jest.mock('src/api/HomeServices', () => ({
  getCashBack: jest.fn(),
}));

describe('useCashbackData', () => {
  it('should initialize states correctly', async () => {
    const { result } = renderHook(() =>
      useCashbackData({ errorServices: [], setErrorServices: jest.fn() }),
    );
    expect(result.current.pointCashback).toBe(0);
    expect(result.current.loading).toBe(true);
    expect(result.current.errorServiceCashback).toBe(false);
  });

  it('handles successful cashback fetch', async () => {
    const mockCashbackData = [{ pointsBalance: '10' }, { pointsBalance: '20' }];
    HomeServices.getCashBack.mockResolvedValue(mockCashbackData);

    const setErrorServicesMock = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackData({ errorServices: [], setErrorServices: setErrorServicesMock }),
    );

    act(() => {
      result.current.getCashBack();
    });

    await waitForNextUpdate();

    expect(result.current.pointCashback).toBe(30);
    expect(result.current.loading).toBe(false);
    expect(result.current.errorServiceCashback).toBe(false);
  });

  it('handles an error in cashback fetch', async () => {
    HomeServices.getCashBack.mockRejectedValue(new Error('Failed to fetch'));

    const setErrorServicesMock = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackData({ errorServices: [], setErrorServices: setErrorServicesMock }),
    );

    act(() => {
      result.current.getCashBack();
    });

    await waitForNextUpdate();

    expect(result.current.errorServiceCashback).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(setErrorServicesMock).toHaveBeenCalledWith(expect.arrayContaining(['cashback']));
  });

  it('removes cashback from errorServices on successful fetch', async () => {
    const mockCashbackData = [{ pointsBalance: '10' }];
    HomeServices.getCashBack.mockResolvedValue(mockCashbackData);

    const initialErrorServices = ['cashback', 'otherService'];
    const setErrorServicesMock = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackData({
        errorServices: initialErrorServices,
        setErrorServices: setErrorServicesMock,
      }),
    );

    act(() => {
      result.current.getCashBack();
    });

    await waitForNextUpdate();

    expect(setErrorServicesMock).toHaveBeenCalledWith(['otherService']);
  });

  it('adds cashback to errorServices on failed fetch', async () => {
    HomeServices.getCashBack.mockRejectedValue(new Error('Failed to fetch'));

    const initialErrorServices = ['otherService'];
    const setErrorServicesMock = jest.fn();

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackData({
        errorServices: initialErrorServices,
        setErrorServices: setErrorServicesMock,
      }),
    );

    act(() => {
      result.current.getCashBack();
    });

    await waitForNextUpdate();

    expect(setErrorServicesMock).toHaveBeenCalledWith(['otherService', 'cashback']);
  });
});
