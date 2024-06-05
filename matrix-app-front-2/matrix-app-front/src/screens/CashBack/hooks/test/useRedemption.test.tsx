import React from 'react';
import axios from 'axios';
import { act, renderHook, waitFor } from '@testing-library/react-native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { formatDate } from 'src/utils/date-time/date-time';
import Helpers from 'src/utils/Helpers';
import { maskData } from 'src/utils/obfuscated/ObfuscatedDataProfile';
import CashbackServices from 'src/api/CashbackServices';
import { ProcessingPayment } from 'assets/lottie';
import { RedemptionStatusResponse } from 'src/api/types/cashbackTypes';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import { i18n } from 'src/utils/core/MTXStrings';
import { useRedemption } from '../useRedemption';

const newStore: any = { ...INITIAL_STORE_MOCK };
newStore.session = {
  user: {
    email: 'test@test.com',
    name: 'John test',
  },
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
// Mocking dependencies
jest.mock('lottie-react-native', () => 'LottieView');
jest.mock('src/api/CashbackServices', () => ({
  redemptionProcessing: jest.fn(),
  redemptionStatus: jest.fn(),
}));
jest.mock('src/utils/Analytics', () => ({ logCrashlytics: jest.fn() }));
jest.mock('react-redux', () => ({ useSelector: jest.fn() }));
jest.mock('src/api/CashbackServices');

const mockNavigation = {
  dispatch: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
};

const points = {
  minRedemptionPoints: 2,
  maxRedemptionPoints: 99999,
  pointsExchangeRate: 1,
};

const mockState = {
  initialState: {
    accumulatedCashback: 10.00,
    amountEntered: 8.50,
    account: '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2',
    rules: points,
  },
  session: {
    user: {
      email: 'test@example.com',
    },
  },
};

jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  const mockSelector = (selector: any) => {
    if (selector.toString() === 'function useRedemption(state) { ... }') {
      return mockState;
    }
    return {};
  };

  return {
    ...actualModule,
    useSelector: jest.fn(mockSelector),
  };
});

const mockStateRedemptionAmountEntered = {
  initialState: {
    accumulatedCashback: 10.00,
    amountEntered: 8.50,
    account: '3e4b9f3b-b448-4d8e-a0cd-07a1bae50ed2',
    rules: points,
  },
};

const routeParams = {
  date: '2023-12-18',
  hour: '14:30',
  amountMoney: '$100',
  accountNumber: '1234567890',
  email: 'example@example.com',
};

describe('useRedemption', () => {
  const navigate = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  it('should initialize correctly', () => {
    const { result } = renderHook(() =>
      useRedemption({
        navigation: mockNavigation,
        route: {
          params: routeParams,
          key: '',
          name: '',
        },
      }));
    const {
      progress, StatusImage, isButtonEnabled,
    } = result.current;

    expect(progress).toBe(0);
    expect(StatusImage).toBeInstanceOf(Function);
    expect(isButtonEnabled).toBe(false);
  });

  it('should handle press back arrow', () => {
    const { result } = renderHook(() =>
      useRedemption({
        navigation: mockNavigation,
        route: {
          params: routeParams,
          key: '',
          name: '',
        },
      }));
    const { onPressBackArrow } = result.current;

    act(() => {
      onPressBackArrow();
    });

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });

  it('should update progress with useInterval', () => {
    jest.useFakeTimers();

    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.progress).toBeGreaterThanOrEqual(0);
    expect(result.current.progress).toBeLessThanOrEqual(99);

    jest.useRealTimers();
  });

  it('should allow to navigate to warning screen when is INVALID_POINTS', async () => {
    const mappedRequests = {
      '/v1/me/cashback/redemptions/': {
        data: {
          card: {},
          id: 'b626a67c-b87f-4416-827d-d21764986cbb',
          points: 10000000000,
          date: '2023-11-03T17:11:49.189Z',
          status: 'FAILED',
          errorReason: 'Invalid points amount',
          errorCode: 'INVALID_POINTS',
        },
      },

    };
    mockedAxios.post.mockImplementation(
      (url) =>
        new Promise((resolve) => {
          if (mappedRequests.hasOwnProperty(url)) {
            resolve(mappedRequests[url as keyof typeof mappedRequests]);
          }
        }),
    );
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'warning',
      errorBlocked: false,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      }));
  });

  it('should allow to navigate to error screen when is INVALID_CARD_ACCOUNT', async () => {
    const mappedRequests = {
      '/v1/me/cashback/redemptions/': {
        data: {
          card: {},
          id: 'b626a67c-b87f-4416-827d-d21764986cbb',
          points: 12,
          date: '2023-11-03T17:11:49.189Z',
          status: 'FAILED',
          errorReason: 'Invalid card status',
          errorCode: 'INVALID_CARD_ACCOUNT',
        },
      },

    };
    mockedAxios.post.mockImplementation(
      (url) =>
        new Promise((resolve) => {
          if (mappedRequests.hasOwnProperty(url)) {
            resolve(mappedRequests[url as keyof typeof mappedRequests]);
          }
        }),
    );
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'error',
      errorBlocked: true,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'error',
        errorBlocked: true,
      }));
  });

  it('should allow to navigate to success screen', async () => {
    const result = mockStateRedemptionAmountEntered;
    const { pointsExchangeRate } = result.initialState.rules;

    const mappedRequests = {
      '/v1/me/cashback/redemptions/': {
        data: {
          card: {},
          id: '761bbccc-2da2-400a-a2a6-b8b7052c5634',
          lastUpdate: '2023-11-28T02:37:10.884Z',
          points: 0.5,
          status: 'REQUESTED',
        },
      },
    };
    mockedAxios.post.mockImplementation(
      (url) =>
        new Promise((resolve) => {
          if (mappedRequests.hasOwnProperty(url)) {
            resolve(mappedRequests[url as keyof typeof mappedRequests]);
          }
        }),
    );

    const resp = {
      data: {
        card: {
          alias: '************6531',
          id: 'b626a67c-b87f-4416-827d-d21764986cbb',
        },
        id: 'af597c67-f850-4801-8136-bbf6e32f81e3',
        lastUpdate: '2023-11-21T21:16:15.434Z',
        points: 2,
        status: 'COMPLETED',
      },
    };

    axios.get = jest.fn().mockResolvedValue(resp);
    navigate(navigationScreenNames.redemption.validationSuccess, {
      date: formatDate(resp.data.lastUpdate, 'dddd[,] DD [de] MMMM [del] YYYY'),
      hour: formatDate(resp.data.lastUpdate, 'hh:mm a'),
      amountMoney: Helpers.formatCurrency(
        resp.data.points * pointsExchangeRate,
        { removeDecimalsWhenRounded: false },
      ),
      accountNumber: Helpers.limitAccountNumberString(resp.data.card.alias, 8),
      email: maskData('test.matrix@gmail.com', 'email', 2),
    });

    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(navigationScreenNames.redemption.validationSuccess, {
        date: formatDate(resp.data.lastUpdate, 'dddd[,] DD [de] MMMM [del] YYYY'),
        hour: formatDate(resp.data.lastUpdate, 'hh:mm a'),
        amountMoney: Helpers.formatCurrency(
          resp.data.points * pointsExchangeRate,
          { removeDecimalsWhenRounded: false },
        ),
        accountNumber: Helpers.limitAccountNumberString(resp.data.card.alias, 8),
        email: maskData('test.matrix@gmail.com', 'email', 2),
      }));
  });

  it('should navigate to redemption validation error screen', async () => {
    // Act
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }), { });

    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '123' });
    // Simulate onPressContinue that triggers navigate
    await act(async () => {
      result.current.onPressContinue();
    });

    const resp : RedemptionStatusResponse = {
      card: {
        alias: '************6531',
        id: 'b626a67c-b87f-4416-827d-d21764986cbb',
      },
      description: 'Redemption error',
      errorCode: 'PROVIDER_ERROR',
      errorReason: 'Cash Rebate Decline (Transaction Amount (0.5) is Less Than Min Hold Limit (1.0))(F3431846)',
      id: '761bbccc-2da2-400a-a2a6-b8b7052c5634',
      lastUpdate: '2023-11-28T02:37:14.858Z',
      points: 0.5,
      status: 'FAILED',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'warning',
      errorBlocked: false,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      }));
  });

  it('should navigate to redemption validation error screen invalid_points', async () => {
    // Act
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }), { });

    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '456' });
    // Simulate onPressContinue that triggers navigate
    await act(async () => {
      result.current.onPressContinue();
    });

    const resp : RedemptionStatusResponse = {
      card: {
        alias: '',
        id: '',
      },
      description: 'Redemption error',
      errorReason: 'Invalid points amount',
      errorCode: 'INVALID_POINTS',
      id: '761bbccc-2da2-400a-a2a6-b8b7052c5634',
      lastUpdate: '2023-11-28T02:37:14.858Z',
      points: 10000000000,
      status: 'FAILED',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'warning',
      errorBlocked: false,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      }));
  });

  it('should set the initial screen content correctly', () => {
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }));
    const initialScreenContent = result.current.screenContent;

    expect(initialScreenContent.id).toBe(1);
    expect(initialScreenContent.title).toBe(i18n.t('cashBack:redemptionLoading.completing.title')),
    expect(initialScreenContent.image).toBe(ProcessingPayment);
    expect(initialScreenContent.minValue).toBe(0);
  });

  it('should navigate to redemption validation error screen invalid_card_account', async () => {
    // Act
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }), { });

    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '123' });
    // Simulate onPressContinue that triggers navigate
    await act(async () => {
      result.current.onPressContinue();
    });

    const resp : RedemptionStatusResponse = {
      card: {
        alias: '',
        id: '',
      },
      description: 'Redemption error',
      id: 'b626a67c-b87f-4416-827d-d21764986cbb',
      points: 12,
      lastUpdate: '2023-11-28T02:37:14.858Z',
      status: 'FAILED',
      errorReason: 'Invalid card status',
      errorCode: 'INVALID_CARD_ACCOUNT',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'error',
      errorBlocked: true,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'error',
        errorBlocked: true,
      }));
  });

  it('should allow to navigate to warning screen when is invalid_card_status', async () => {
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }), { });

    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '555' });
    // Simulate onPressContinue that triggers navigate
    await act(async () => {
      result.current.onPressContinue();
    });

    const resp : RedemptionStatusResponse = {
      card: {
        alias: '',
        id: '',
      },
      description: 'Redemption error',
      id: 'b626a67c-b87f-4416-827d-d21764986cbb',
      points: 2,
      lastUpdate: '2023-11-03T17:11:49.189Z',
      status: 'FAILED',
      errorReason: 'Invalid card status for redemption',
      errorCode: 'INVALID_CARD_STATUS',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);
    navigate(navigationScreenNames.redemption.validationError, {
      type: 'warning',
      errorBlocked: false,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      }));
  });

  it('should allow to navigate to warning screen when completed', async () => {
    // Arrange
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }));
    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '123' });

    const { onPressContinue } = result.current;

    // Mock CashbackServices.redemptionProcessing response
    const resp : RedemptionStatusResponse = {
      card: {
        alias: '************6531',
        id: 'b626a67c-b87f-4416-827d-d21764986cbb',
      },
      id: 'af597c67-f850-4801-8136-bbf6e32f81e3',
      lastUpdate: '2023-11-21T21:16:15.434Z',
      points: 2,
      status: 'COMPLETED',
      description: 'Redemption loading',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);

    // Act
    await act(async () => {
      await onPressContinue();
    });

    // Assert
    expect(mockNavigation.navigate).toHaveBeenCalledWith('RedemptionLoading');
  });

  it('should allow to navigate to warning screen when is request ', async () => {
    // Arrange
    const { result } = renderHook(() => useRedemption({
      navigation: mockNavigation,
      route: {
        params: routeParams,
        key: '',
        name: '',
      },
    }));
    jest.spyOn(CashbackServices, 'redemptionProcessing').mockResolvedValue({ redemptionId: '123' });

    await act(async () => {
      result.current.onPressContinue();
    });

    const resp : RedemptionStatusResponse = {
      card: {
        alias: '',
        id: '',
      },
      id: '761bbccc-2da2-400a-a2a6-b8b7052c5634',
      lastUpdate: '2023-11-28T02:37:10.884Z',
      points: 0.5,
      status: 'REQUESTED',
      description: 'Redemption loading',
      errorReason: '',
      errorCode: 'INVALID_POINTS',
    };

    axios.get = jest.fn().mockResolvedValue(resp);

    jest.spyOn(CashbackServices, 'redemptionStatus').mockResolvedValue(resp);

    navigate(navigationScreenNames.redemption.validationError, {
      type: 'warning',
      errorBlocked: false,
    });

    await waitFor(() =>
      expect(navigate).toBeCalledWith(navigationScreenNames.redemption.validationError, {
        type: 'warning',
        errorBlocked: false,
      }));
  });

  it('should resolve immediately if status is not requested', async () => {
    const redemptionId = 'af597c67-f850-4801-8136-bbf6e32f81e3';
    const { result } = renderHook(() =>
      useRedemption({
        navigation: mockNavigation,
        route: {
          params: routeParams,
          key: '',
          name: '',
        },
      }));

    result.current.redemptionStatus(redemptionId);
    // Arrange

    // Mock the useRedemption module and ensure the mocked function is used
    jest.spyOn(CashbackServices, 'redemptionStatus').mockImplementation(CashbackServices.redemptionStatus);

    jest.advanceTimersByTime(600);

    // Assert

    expect(CashbackServices.redemptionStatus).toHaveBeenCalledTimes(1);
    expect(CashbackServices.redemptionStatus).toHaveBeenCalledWith(redemptionId);
  });
});
