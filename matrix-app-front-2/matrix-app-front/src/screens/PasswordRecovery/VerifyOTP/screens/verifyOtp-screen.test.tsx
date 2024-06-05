import React from 'react';
import * as ReactRedux from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import {
  fireEvent,
  render,
  waitFor,
} from 'jest/test-utils';
import { Auth } from 'aws-amplify';
import VerifyOTPScreen from './verifyOtp-screen';

jest.mock('aws-amplify');
const mockedAws = Auth as jest.Mocked<typeof Auth>;

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        test: '1',
        documentNumber: '12345678',
      },
    }),
  };
});
describe('Recover Password - OTP Verification', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  beforeEach(() => {
    useDispatchMock.mockClear();
  });
  const newStore: any = { ...INITIAL_STORE_MOCK };
  newStore.session = {
    user: {
      email: 'test@test.com',
      name: 'John',
      alias: 'alias',
      lastName: 'Doe',
      documentNumber: '12345678',
      address: 'test',
      phoneNumber: '1212122121',
    },
  };
  const store = configureStore()(newStore);

  const navigate = jest.fn();

  const component = (
    <VerifyOTPScreen
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          stack: 'forgotPassword',
          isBlocked: false,
          destination: '135135135',
          documentNumber: '13513531',
        },
        key: '',
        name: '',
      }}
    />
  );

  it('should navigate to otp screen', async () => {
    mockedAws.forgotPassword.mockResolvedValue({
      CodeDeliveryDetails: {
        DeliveryMedium: 'EMAIL',
      },
    });
    const { findAllByPlaceholderText } = render(component, { customStore: store });
    const elements = await findAllByPlaceholderText('-');
    elements.forEach((textInput) => {
      fireEvent.changeText(textInput, '2');
    });
    await waitFor(() => expect(navigate).toBeCalled(), { timeout: 3000 });
    expect(navigate).toBeCalledWith(
      'NewPassword',
      {
        code: '222222',
        documentNumber: '12345678',
      },
    );
  });
});
