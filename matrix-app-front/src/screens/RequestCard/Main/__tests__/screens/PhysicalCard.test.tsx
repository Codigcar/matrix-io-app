import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import { ThemeProvider } from '@shopify/restyle';
import { Box, rebrandingTheme } from 'matrix-ui-components';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import { store } from 'src/core/libraries-implementation/state-manager/store';
import PhysicalCard from '../../screens/PhysicalCard';
import usePhysicalCardDeliveryStatus from '../../hooks/usePhysicalCardDeliveryStatus';

jest.mock('@react-navigation/native');
const MockSlider = ({ data }) => <Box data={data}>Mock Slider</Box>;

jest.mock('../../hooks/usePhysicalCardDeliveryStatus');
jest.mock('src/shared/providers/analytics/index');

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: ({ children }) => (
    <>
      {' '}
      {children}
      {' '}
    </>
  ),
}));

jest.mock('src/screens/RequestCard/Slider/components/Slider', () => ({
  __esModule: true,
  default: jest.fn(({ data }) => <MockSlider data={data} />),
}));

const mockNavigation: any = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  push: jest.fn(),
};

beforeEach(() => {
  mockNavigation.navigate.mockClear();
  mockNavigation.dispatch.mockClear();
  mockNavigation.goBack.mockClear();
});

const component = (
  <SafeAreaProvider>
    <SafeAreaInsetsContext.Provider value={{
      top: 20, right: 20, bottom: 20, left: 20,
    }}
    >
      <ThemeProvider theme={rebrandingTheme}>
        <Provider store={store}>
          <PhysicalCard navigation={mockNavigation} route={{}} />
        </Provider>
      </ThemeProvider>
    </SafeAreaInsetsContext.Provider>
  </SafeAreaProvider>
);

describe('PhysicalCard component', () => {
  it('should render loading view when isLoading is true', async () => {
    (usePhysicalCardDeliveryStatus as jest.Mock).mockReturnValue({
      isLoading: true,
      isClosed: false,
      hasProduct: false,
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
      },
      deliveryData: null,
      goToRequestPhysicalCard: jest.fn(),
    });

    const { getByTestId } = render(component);
    expect(getByTestId('loading-view')).toBeTruthy();
  });

  it('should render OrderStatusScreen when hasProduct is true', async () => {
    (usePhysicalCardDeliveryStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isClosed: false,
      hasProduct: true,
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
      },
      deliveryData: {
        deliveryDate: '2024-01-01',
        deliveryOrderId: '00001',
        inning: 'morning',
        inningDescription: '6:00 a.m. hasta la 1:00 p.m.',
        location: {
          address: 'Calle Nueva York 123',
          department: 'Cusco',
          district: 'Cusco',
          province: 'Cusco',
          reference: 'Parque',
        },
        phoneNumber: '+51987651324',
        status: 'PENDING',
      },
      goToRequestPhysicalCard: jest.fn(),
    });

    const { getByTestId } = render(component);
    expect(getByTestId('order-status-screen')).toBeTruthy();
  });

  it('should render the component with Slider when neither isLoading, isClosed, nor hasProduct are true', async () => {
    (usePhysicalCardDeliveryStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isClosed: false,
      hasProduct: false,
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
      },
      deliveryData: null,
      goToRequestPhysicalCard: jest.fn(),
    });

    const { getByTestId } = render(component);
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('should call goToRequestPhysicalCard when the button is pressed', async () => {
    const mockGoToRequestPhysicalCard = jest.fn();
    (usePhysicalCardDeliveryStatus as jest.Mock).mockReturnValue({
      isLoading: false,
      isClosed: false,
      hasProduct: false,
      navigation: {
        navigate: jest.fn(),
        setOptions: jest.fn(),
      },
      deliveryData: null,
      goToRequestPhysicalCard: mockGoToRequestPhysicalCard,
    });

    const { getByText } = render(component);
    fireEvent.press(getByText(string.physicalCardButton));
    expect(mockGoToRequestPhysicalCard).toHaveBeenCalled();
  });
});
