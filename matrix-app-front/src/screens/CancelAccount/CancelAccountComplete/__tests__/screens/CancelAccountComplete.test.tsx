import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { render, renderHook, act } from 'jest/test-utils';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import useCancelAccountComplete from '../../hooks/useCancelAccountComplete';
import CancelAccountComplete from '../../CancelAccountComplete';

const navigate = jest.fn();

const ComponentRenderProps: NavigationPropsType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate,
    reset: jest.fn(),
  },
  route: {
    params: {
      requestTime: '',
      requestDate: '',
      maskedCard: '',
      pendingPayment: '',
      pendingCreditBalance: '',
    },
    key: '',
    name: '',
  },
};

const ComponentRender = (props: NavigationPropsType) =>
  render(<CancelAccountComplete {...props} />);

describe('CancelAccountComplete Screen', () => {
  it('should render CancelAccountComplete screen', () => {
    const componentRendered = ComponentRender(ComponentRenderProps);
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with requestTime', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          requestTime: 'requestTime',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen without pendingPayment', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          pendingPayment: '',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with pendingPayment', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          pendingPayment: '1000',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen without pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          pendingCreditBalance: '',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          pendingCreditBalance: '1000',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with pendingPayment and pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          pendingPayment: '1000',
          pendingCreditBalance: '1000',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen without requestDate', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          requestDate: '',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with requestDate', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          requestDate: '10/12/2023',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen without maskedCard', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          maskedCard: '',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with maskedCard', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          maskedCard: '1234',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with requestTime, requestDate, maskedCard, pendingPayment and pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          requestTime: 'requestTime',
          requestDate: '10/12/2023',
          maskedCard: '1234',
          pendingPayment: '1000',
          pendingCreditBalance: '1000',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render CancelAccountComplete screen with requestTime, requestDate, maskedCard, pendingPayment and pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...ComponentRenderProps,
      route: {
        params: {
          ...ComponentRenderProps.route.params,
          requestTime: 'requestTime',
          requestDate: '10/12/2023',
          maskedCard: '1234',
          pendingPayment: '1000',
          pendingCreditBalance: '1000',
        },
        key: '',
        name: '',
      },
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const store = configureStore()({ ...INITIAL_STORE_MOCK });
    const { result } = renderHook(() => useCancelAccountComplete(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.onPressChat).toBeTruthy();
    expect(result.current.onPressContinue).toBeTruthy();
    expect(result.current.onPressPayment).toBeTruthy();
    expect(result.current.onPressBackArrow).toBeTruthy();

    act(() => {
      result.current.onPressContinue();
      result.current.onPressChat();
      result.current.onPressPayment();
      result.current.onPressBackArrow();
    });

    expect(navigate).toHaveBeenCalled();
  });
});
