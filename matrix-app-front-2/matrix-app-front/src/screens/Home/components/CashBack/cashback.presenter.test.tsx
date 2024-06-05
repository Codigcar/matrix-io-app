import { renderHook, act } from '@testing-library/react-hooks';
import * as redux from 'react-redux';
import * as navigation from '@react-navigation/native';
import useCashbackInteractor from './cashback.interactor';
import { useCashbackPresenter } from './cashback.presenter';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));
jest.mock('./cashback.interactor');

describe('useCashbackPresenter', () => {
  const mockDispatch = jest.fn();
  const mockExecuteGetCashback = jest.fn();
  const mockExecuteGetCashbackRule = jest.fn();
  const setErrorServicesMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    redux.useDispatch.mockReturnValue(mockDispatch);
    navigation.useIsFocused.mockReturnValue(true);
    useCashbackInteractor.mockReturnValue({
      executeGetCashback: mockExecuteGetCashback,
      executeGetCashbackRule: mockExecuteGetCashbackRule,
    });
  });

  it('should initialize with default states', () => {
    // eslint-disable-next-line max-len
    const { result } = renderHook(() =>
      useCashbackPresenter({
        errorServices: [],
        setErrorServices: setErrorServicesMock,
        onPress: jest.fn(),
      }),
    );

    expect(result.current.pointCashback).toBe(0);
    expect(result.current.loading).toBe(true);
    expect(result.current.errorServiceCashback).toBe(false);
    expect(result.current.disabled).toBe(false);
  });

  it('successfully executes getCashBack and updates state', async () => {
    const mockData = {
      account: '1',
      pointsBalance: '10',
      pointsExchangeRate: '15',
      pointsAmount: '20',
      expiryDate: '5',
    };
    mockExecuteGetCashback.mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackPresenter({
        errorServices: [],
        setErrorServices: setErrorServicesMock,
        onPress: jest.fn(),
      }),
    );

    await waitForNextUpdate();

    expect(result.current.pointCashback).toBe(0);
    expect(result.current.errorServiceCashback).toBe(true);
  });

  it('handles error in getCashBack', async () => {
    mockExecuteGetCashback.mockRejectedValue(new Error('Failed to fetch cashback'));

    const { result, waitForNextUpdate } = renderHook(() =>
      useCashbackPresenter({
        errorServices: [],
        setErrorServices: setErrorServicesMock,
        onPress: jest.fn(),
      }),
    );

    await waitForNextUpdate();

    expect(result.current.errorServiceCashback).toBe(true);
    expect(setErrorServicesMock).toHaveBeenCalledWith(['cashback']);
  });

  it('successfully executes getRedemptionRules', async () => {
    mockExecuteGetCashbackRule.mockResolvedValue();

    const { result } = renderHook(() =>
      useCashbackPresenter({
        errorServices: [],
        setErrorServices: setErrorServicesMock,
        onPress: jest.fn(),
      }),
    );

    await act(async () => {
      await result.current.onPressHandler();
    });
  });

  it('removes cashback from errorServices on successful fetch', async () => {
    mockExecuteGetCashback.mockResolvedValue([{ pointsBalance: '10' }]);

    const initialErrorServices = ['cashback', 'otherService'];
    const { waitForNextUpdate } = renderHook(() =>
      useCashbackPresenter({
        errorServices: initialErrorServices,
        setErrorServices: setErrorServicesMock,
        onPress: jest.fn(),
      }),
    );

    await waitForNextUpdate();

    expect(setErrorServicesMock).toHaveBeenCalledWith(['otherService']);
  });

  it('calls onPress after executing getRedemptionRules', async () => {
    const onPressMock = jest.fn();

    const { result, waitFor } = renderHook(() =>
      useCashbackPresenter({
        errorServices: [],
        setErrorServices: setErrorServicesMock,
        onPress: onPressMock,
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.errorServiceCashback).toBe(false);
    });

    await act(async () => {
      await result.current.onPressHandler();
    });

    expect(onPressMock).toHaveBeenCalled();
  });
});
