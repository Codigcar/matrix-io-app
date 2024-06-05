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
import NewPasswordScreen from './newPassword-screen';

jest.mock('aws-amplify');
const mockedAws = Auth as jest.Mocked<typeof Auth>;

xdescribe('Recover Password - New Password', () => {
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
    <NewPasswordScreen
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

  it('should go to response scene when success', async () => {
    mockedAws.forgotPasswordSubmit.mockResolvedValue('Done');
    const { findByTestId } = render(component, { customStore: store });
    const password = await findByTestId('password');
    const passwordRepeat = await findByTestId('password_repeat');
    const submitPassword = await findByTestId('submit-new-password');
    fireEvent.changeText(password, '123456.Qwe');
    fireEvent.changeText(passwordRepeat, '123456.Qwe');
    await waitFor(() => expect(submitPassword.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(submitPassword);
    await waitFor(() => expect(navigate).toBeCalled());
    expect(navigate).toBeCalledWith(
      'PasswordRecoveryResponse',
      {
        isOkResponse: true,
      },
    );
  });

  it('should go to response page when failed', async () => {
    mockedAws.forgotPasswordSubmit.mockRejectedValue('');
    const { findByTestId } = render(component, { customStore: store });
    const password = await findByTestId('password');
    const passwordRepeat = await findByTestId('password_repeat');
    const submitPassword = await findByTestId('submit-new-password');
    fireEvent.changeText(password, '123456.Qwe');
    fireEvent.changeText(passwordRepeat, '123456.Qwe');
    await waitFor(() => expect(submitPassword.props.accessibilityState.disabled).toBe(false));
    fireEvent.press(submitPassword);
    await waitFor(() => expect(navigate).toBeCalled());
    expect(navigate).toBeCalledWith(
      'PasswordRecoveryResponse',
      {
        isOkResponse: false,
      },
    );
  });
});
