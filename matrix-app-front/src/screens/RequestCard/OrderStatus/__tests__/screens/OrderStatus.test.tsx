import React from 'react';
import { render, renderHook, waitFor } from 'jest/test-utils';
import { OrderStatusType } from 'src/types/types';
import configureStore from 'redux-mock-store';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import { Provider } from 'react-redux';

import { act } from 'react-test-renderer';
import { CARD_IS_OPEN } from 'src/utils/constants';
import OrderStatusScreen from '../../screens/OrderStatus';
import useOrderStatus from '../../hooks/useOrderStatus';

const store = configureStore()({ ...INITIAL_STORE_MOCK, cards: { statusCard: CARD_IS_OPEN } });

const defaultProps: OrderStatusType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
  },
  deliveryData: {
    deliveryDate: '2021-09-30',
    location: {
      address: 'Av. Los Pinos 123',
      deparment: 'Lima',
      province: 'Lima',
      district: 'San Isidro',
      city: '',
    },
    phoneNumber: '987654321',
    deliveryOrderId: '123456789',
    inningDescription: 'Inning 1',
    inning: '',
    status: '',
  },
};

const componentRender = (props: OrderStatusType) => render(<OrderStatusScreen {...props} />);

describe('OrderStatusScreen Screen', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const { result } = renderHook(() => useOrderStatus(defaultProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.setInactiveVirtualCardModal(true);
    });

    waitFor(() => {
      expect(result.current.inactiveVirtualCardModal).toBeTruthy();
    });

    act(() => {
      result.current.onPressGoConfigureCard();
    });

    waitFor(() => {
      expect(result.current.inactiveVirtualCardModal).toBeFalsy();
    });
  });
});
