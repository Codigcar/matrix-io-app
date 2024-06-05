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
import GetDocumentScreen from './getDocument-screen';

jest.mock('aws-amplify');
const mockedAws = Auth as jest.Mocked<typeof Auth>;

xdescribe('Recover Password - Get Document Page', () => {
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
    <GetDocumentScreen
      navigation={{
        dispatch: jest.fn(),
        goBack: jest.fn(),
        navigate,
        reset: jest.fn(),
      }}
      route={{
        params: {
          values: {
          },
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
    const { findByTestId } = render(component, { customStore: store });
    const element = await findByTestId('DniInput');
    const button = await findByTestId('SubmitDNI');
    fireEvent.changeText(element, '12345678');
    await waitFor(() => expect(button.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(button);
    await waitFor(() => expect(navigate).toBeCalled());
    expect(navigate).toBeCalledWith(
      'VerifyOTP',
      {
        destination: 'correo',
        documentNumber: '12345678',
      },
    );
  });
});
