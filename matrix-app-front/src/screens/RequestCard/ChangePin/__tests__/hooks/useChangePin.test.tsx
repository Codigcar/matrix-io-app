import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { NavigationContainer } from '@react-navigation/native';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { CARD_IS_INACTIVE, CARD_IS_OPEN } from 'src/utils/constants';
import { render } from '@testing-library/react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import * as Navigation from '@react-navigation/native';
import CardInfo from 'src/screens/RequestCard/CardInfo/screens/screen-cardInfo';
import useChangePin from '../../hooks/useChangePin';

jest.mock('src/api/I2cCardServices', () => ({
  getCardSignature: jest.fn(() => ({ signOnToken: 'mockToken' })),
  getCards: jest.fn(() => [{ id: 'mockId', reference: 'mockReference', status: 'mockStatus' }]),
}));

jest.mock('src/utils/auth/session/checkActivityApp', () => jest.fn());

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: jest.fn(),
}));

const mockStore = configureStore();

describe('useChangePin', () => {
  let store;
  let mockNavigation;

  beforeEach(() => {
    store = mockStore({
      cards: {
        cards: [{ id: '1', reference: 'ref1', status: CARD_IS_OPEN }],
        statusPhysicalCard: CARD_IS_INACTIVE,
      },
    });

    mockNavigation = {
      navigate: jest.fn(),
    };
  });
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useChangePin({ navigation: {} }), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });

    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.i2cErrorModal).toBeFalsy();
    expect(result.current.inactivePhysicalCardModal).toBeFalsy();
    expect(result.current.forgotPinVisible).toBeFalsy();
    expect(result.current.i2cHasErrorDisabled).toBeFalsy();
  });

  it('should handle changePin function', async () => {
    const navigationMock = {
      navigate: jest.fn(),
    };

    const { result } = renderHook(() => useChangePin({ navigation: navigationMock }), {
      wrapper: ({ children }) => (
        <Provider store={store}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      ),
    });

    await act(async () => {
      await result.current.changePin();
    });

    expect(navigationMock.navigate).toHaveBeenCalledWith(
      navigationScreenNames.genericError,
      expect.objectContaining({ nextScreen: navigationScreenNames.bottomTabNavigator }),
    );
  });

  it('should handle i2c events', async () => {
    useNetInfo.mockReturnValue({ isConnected: true });
    Navigation.useIsFocused.mockReturnValue(true);

    render(
      <Provider store={store}>
        <CardInfo navigation={mockNavigation} route={{}} />
      </Provider>,
    );
  });

  it('should handle i2c events when device is disconnected', async () => {
    useNetInfo.mockReturnValue({ isConnected: false });
    Navigation.useIsFocused.mockReturnValue(true);

    render(
      <Provider store={store}>
        <CardInfo navigation={mockNavigation} route={{}} />
      </Provider>,
    );
  });

  it('should handle i2c events when component is not focused', async () => {
    useNetInfo.mockReturnValue({ isConnected: true });
    Navigation.useIsFocused.mockReturnValue(false);

    render(
      <Provider store={store}>
        <CardInfo navigation={mockNavigation} route={{}} />
      </Provider>,
    );
  });
});
