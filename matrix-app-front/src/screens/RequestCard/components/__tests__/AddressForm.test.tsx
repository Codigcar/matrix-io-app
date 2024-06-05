import React from 'react';
import { render, renderHook, waitFor } from 'jest/test-utils';
import { LocationProvider } from 'src/store/states/locationContext';
import getProfileData from 'src/api/ProfileServices';
import { Provider } from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import useLocationForm from '../../RequestOrder/hooks/useLocationForm';
import AddressForm from '../addressForm';
import { AddressFormProps } from '../../shared/types/components';

const mockScrollToEnd = jest.fn();

const store = configureStore()({ ...INITIAL_STORE_MOCK });

jest.mock('aws-amplify', () => ({
  Auth: {
    currentAuthenticatedUser: jest.fn().mockResolvedValue({
      username: 'username',
    }),
  },
}));

jest.mock('react-native-quick-base64', () => ({
  atob: jest.fn(),
}));

jest.mock('react-native', () => ({
  Platform: {
    OS: 'ios',
  },
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
  },
  ScrollView: {
    ScrollView: jest.requireActual('react-native').ScrollView,
    current: {
      scrollToEnd: mockScrollToEnd,
    },
  },
  Keyboard: {
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
  },
}));

jest.mock('src/api/ProfileServices');

const defaultProps: AddressFormProps = {
  addressEdit: {
    department: null,
    province: null,
    district: null,
    address: '',
    label: '',
    reference: '',
  },
  onSubmit: jest.fn(),
  props: {
    navigation: {
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
      reset: jest.fn(),
      setOptions: jest.fn(),
      push: jest.fn(),
    },
    route: {
      params: {
        requestTime: '',
        requestDate: '',
        maskedCard: '',
        pendingPayment: '',
        pendingCreditBalance: '',
        onboarding: true,
      },
      key: '',
      name: '',
    },
  },
};

const componentRender = (props: AddressFormProps) =>
  render(
    <LocationProvider>
      <AddressForm {...props} />
    </LocationProvider>,
  );

describe('AddressForm Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  it('should render correctly with addressEdit props', () => {
    const component = componentRender({
      ...defaultProps,
      addressEdit: {
        department: {
          code: '1',
          comment: 'comment',
          description: 'desc',
          enabled: 1,
          parent: '1',
        },
        province: {
          code: '2',
          comment: 'comment',
          description: 'desc',
          enabled: 1,
          parent: '2',
        },
        district: {
          code: '3',
          comment: 'comment',
          description: 'desc',
          enabled: 1,
          parent: '3',
        },
        address: 'Av. Javier Prado 2323',
        label: 'Casa',
        reference: 'Casa',
      },
    });

    waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  it('should render hook correctly', () => {
    getProfileData.mockResolvedValue({
      data: {
        name: 'name',
        lastName: 'lastName',
        phone_number: '+573555555555',
      },
    });

    const component = componentRender(defaultProps);
    const { result } = renderHook(() => useLocationForm(defaultProps.props), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <LocationProvider>{children}</LocationProvider>
        </Provider>
      ),
    });

    waitFor(() => {
      expect(result.current).toBeTruthy();
    });

    component.unmount();
  });
});
