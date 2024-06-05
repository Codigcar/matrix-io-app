import React from 'react';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import Svg, { Path } from 'react-native-svg';
import { ToastType, showToast } from 'src/matrix-ui-components/components/toast';
import CardPayment from '../CardPayment';
import useListMethodPayments from '../hooks/useListMethodPayments';

const navigate = jest.fn();

// MOCK DATA
const mockStateForAccountOrder = {
  inProgressPaymentOrder: {},
  hasPendingPaymentOrders: true,
  pendingPaymentOrder: {
    type: 'ORDER_CLOSE',
    status: 'ORDER_PENDING',
    dueDate: '2023-10-10',
    pending: { amount: 10 },
  },
};

const MockedIcon: React.FC = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
      stroke="#0D1332"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// MOCK COMPONENT
const component = (
  <CardPayment
    navigation={{
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate,
      reset: jest.fn(),
    }}
    route={{
      params: {
        values: {},
        token: {
          token: 'test',
        },
      },
      key: '',
      name: '',
    }}
  />
);

const componentWithError = (
  <CardPayment
    navigation={{
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate,
      reset: jest.fn(),
    }}
    route={{
      params: {
        values: {},
        token: {
          token: 'test',
        },
        errorValidations: true,
        title: 'Test Title',
        body: 'Test Body',
      },
      key: '',
      name: '',
    }}
  />
);

// MOCK JEST
jest.mock('react-redux', () => {
  const actualModule = jest.requireActual('react-redux');
  const mockSelector = (selector: any) => {
    if (selector.toString() === 'function accountOrderSelector(state) { ... }') {
      return mockStateForAccountOrder;
    }
    return {};
  };

  return {
    ...actualModule,
    useSelector: jest.fn(mockSelector),
  };
});

jest.mock('src/matrix-ui-components/components/toast', () => ({
  ...jest.requireActual('src/matrix-ui-components/components/toast'),
  showToast: jest.fn(),
}));

jest.mock('../hooks/useKeyboard', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isOpenKeyboard: true,
  })),
}));

jest.mock('../hooks/useListMethodPayments', () => jest.fn());
const useListMethodPaymentsMock = useListMethodPayments as jest.Mock;
useListMethodPaymentsMock.mockReturnValue({
  loading: false,
  cardsData: [
    {
      cardNumber: '1234567',
      cardType: 'TC',
      cardId: '1234TC',
      icon: (props: any) => <MockedIcon {...props} />,
      provider: 'tc1234',
    },
  ],
});

describe.skip('<CardPayment />', () => {
  beforeEach(() => {});

  it('should render without crashing', () => {
    const { getByTestId } = render(component);
    const cardPaymentContainer = getByTestId('cardPaymentContainer');
    expect(cardPaymentContainer).toBeTruthy();
  });

  xit('should update the payment amount when "other amount" is selected and inputted', () => {
    const { getByTestId, getByDisplayValue } = render(component);

    const otherAmountPayment = getByTestId('otherAmountPayment');
    fireEvent.press(otherAmountPayment);

    const inputValue = 'S/0,00 ';
    const input = getByTestId('otherAmountPayment');
    fireEvent.changeText(input, inputValue);
    expect(getByDisplayValue(inputValue)).toBeDefined();
  });

  it('debería llamar a navigate y Keyboard.dismiss cuando se ejecuta handleToPay', async () => {
    const { findByTestId } = render(component);

    const continuePaymentButton = await findByTestId('continuePaymentButton');
    const otherAmountPayment = await findByTestId('otherAmountPayment');

    fireEvent.press(otherAmountPayment);
    const otherAmountPaymentInput = await findByTestId('otherAmountPaymentInput');

    fireEvent.changeText(otherAmountPaymentInput, '1.00');

    await waitFor(() =>
      expect(continuePaymentButton.props.accessibilityState.disabled).toBe(false));

    fireEvent.press(continuePaymentButton);
    await waitFor(() => expect(navigate).toBeCalled());
  });

  it('should show toast when errorValidations is true', async () => {
    render(componentWithError);

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith({
        type: ToastType.TypeDanger,
        title: 'Test Title',
        message: 'Test Body',
        visibilityTime: 6000,
      }));
  });

  it('should call NAVIGATE AddDebitCardCulqi when appropriate button is pressed', async () => {
    const { findByTestId } = render(
      <CardPayment
        navigation={{
          dispatch: jest.fn(),
          goBack: jest.fn(),
          navigate,
          reset: jest.fn(),
        }}
        route={{
          params: {
            values: {},
            token: {
              token: 'test',
            },
          },
          key: '',
          name: '',
        }}
      />,
    );

    const navigateButton = await findByTestId('cardContainerNavigate');

    fireEvent.press(navigateButton);

    expect(navigate).toHaveBeenCalledTimes(1);
  });
});
