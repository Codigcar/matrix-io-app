import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { LocationProvider } from 'src/store/states/locationContext';
import useLocationForm from '../../hooks/useLocationForm';

const mockStore = configureStore([]);

let mockNavigation: {
  dispatch: jest.Mock<any, any, any>;
  navigate: jest.Mock;
  goBack?: Function;
  reset?: Function;
  setOptions?: Function;
  push?: Function;
};

beforeEach(() => {
  mockNavigation = {
    navigate: jest.fn(),
    dispatch: jest.fn(),
    goBack: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
  };
});

describe('useLocationForm', () => {
  it('returns initial values correctly', () => {
    const store = mockStore({});
    const navigationProps = {
      navigation: mockNavigation,
      route: { params: { onboarding: true } },
    };

    const { result } = renderHook(() => useLocationForm(navigationProps), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <LocationProvider>{children}</LocationProvider>
        </Provider>
      ),
    });

    expect(result.current.userLocation).toEqual('');
    expect(result.current.departments).toEqual([]);
    expect(result.current.provinces).toEqual([]);
    expect(result.current.districts).toEqual([]);
    expect(result.current.isLoading).toBe(true);
  });

  it('calls goBack correctly', async () => {
    const store = mockStore({});
    const navigationProps = {
      navigation: mockNavigation,
      route: { params: { onboarding: true } },
    };

    const { result } = renderHook(() => useLocationForm(navigationProps), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <LocationProvider>{children}</LocationProvider>
        </Provider>
      ),
    });
    await act(async () => {
      result.current.goBack();
    });

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });

  it('calls onSubmit correctly', async () => {
    const store = mockStore({});
    const navigationProps = {
      navigation: mockNavigation,
      route: { params: { onboarding: true } },
    };

    const { result, waitForNextUpdate } = renderHook(() => useLocationForm(navigationProps), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <LocationProvider>{children}</LocationProvider>
        </Provider>
      ),
    });
    act(() => {
      result.current.onSubmit({
        department: { description: 'Cusco' },
        province: { description: 'Cusco' },
        district: { description: 'Cusco' },
        addressDelivery: 'Str. 123',
        addressReference: 'Parque',
      });
    });

    await waitForNextUpdate();
    expect(result.current.addressDelivery).toEqual({
      department: { description: 'Cusco' },
      province: { description: 'Cusco' },
      district: { description: 'Cusco' },
      address: 'Str. 123',
      label: 'Str. 123 , Cusco , Cusco ',
      reference: 'Parque',
    });
  });
});
