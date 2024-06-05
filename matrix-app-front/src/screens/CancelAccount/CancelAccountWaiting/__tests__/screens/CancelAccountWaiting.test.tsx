import React from 'react';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import { NavigationPropsType } from 'src/types/types';
import { Provider } from 'react-redux';
import HomeServices from 'src/api/HomeServices';
import { act, render, renderHook } from 'src/matrix-ui-components/utils/test-utils';
import CancelAccoiuntWaiting from '../../CancelAccountWaiting';
import useCancelAccountWaiting from '../../hooks/useCancelAccountWaiting';

jest.mock('src/api/HomeServices', () => ({
  getBalance: jest.fn(),
}));

jest.mock('src/utils/Helpers', () => ({
  formatCurrency: jest.fn(),
}));

const store = configureStore()({ ...INITIAL_STORE_MOCK });

const ComponentRenderProps: NavigationPropsType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
  },
  route: {
    params: {},
    key: '',
    name: '',
  },
};

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const ComponentRender = (props: NavigationPropsType) =>
  render(<CancelAccoiuntWaiting {...props} />);

describe('CancelAccoiuntWaiting Screen', () => {
  it('should render CancelAccoiuntWaiting screen', () => {
    const componentRendered = ComponentRender(ComponentRenderProps);
    expect(componentRendered).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const { result } = renderHook(() => useCancelAccountWaiting(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.onCancelAccount).toBeTruthy();
    expect(result.current.isLoading).toBeFalsy();
  });

  it('should handle cancel account successfully', async () => {
    HomeServices.getBalance.mockResolvedValueOnce([
      {
        available: {
          amount: 0,
        },
        creditLimit: {
          amount: 0,
        },
      },
    ]);

    const { result } = renderHook(() => useCancelAccountWaiting(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    await act(async () => {
      await result.current.onCancelAccount();
    });

    expect(ComponentRenderProps.navigation.dispatch).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle cancel account with error', async () => {
    HomeServices.getBalance.mockRejectedValueOnce(new Error());

    const { result } = renderHook(() => useCancelAccountWaiting(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    await act(async () => {
      await result.current.onCancelAccount();
    });

    expect(ComponentRenderProps.navigation.dispatch).not.toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle cancel account with minus balance', async () => {
    HomeServices.getBalance.mockResolvedValueOnce([
      {
        available: {
          amount: 0,
        },
        creditLimit: {
          amount: 1,
        },
      },
    ]);
    const { result } = renderHook(() => useCancelAccountWaiting(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    await act(async () => {
      await result.current.onCancelAccount();
    });

    expect(ComponentRenderProps.navigation.dispatch).toHaveBeenCalled();
    expect(result.current.isLoading).toBe(false);
  });
});
