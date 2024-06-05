import React from 'react';
import * as ReactRedux from 'react-redux';
import { fireEvent, render } from 'jest/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';
import RedemptionError from '../RedemptionError/RedemptionError';

const mockNavigate = jest.fn();
const goBackMock = jest.fn();
const customPropsWarningType = {
  title: i18n.t('cashBack:redemptionError.ups'),
  subtitle: i18n.t('cashBack:redemptionError.detail-invalid-redemption'),
  description: i18n.t('cashBack:redemptionError.its-not-you'),
  buttonText: i18n.t('cashBack:redemptionError.understood'),
  type: 'warning',
  errorBlocked: false,
};

describe('RedemptionError component', () => {
  const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
  beforeEach(() => {
    useDispatchMock.mockClear();
  });
  it('renders correctly with default props', () => {
    const { getByText, findByTestId } = render(<RedemptionError
      navigation={{
        dispatch: jest.fn(),
        goBack: goBackMock,
        navigate: mockNavigate,
        reset: jest.fn(),
        setOptions: jest.fn(),
      }}
      route={{
        params: { customPropsWarningType },
        key: '',
        name: '',
      }}
    />);
    expect(getByText(customPropsWarningType.title)).toBeTruthy();
    expect(getByText(customPropsWarningType.subtitle)).toBeTruthy();
    expect(getByText(customPropsWarningType.description)).toBeTruthy();
    expect(getByText(customPropsWarningType.buttonText)).toBeTruthy();
    expect(findByTestId('understood-button')).toBeTruthy();
  });

  it('calls the goToHome function when the button is pressed', async () => {
    const { findByTestId } = render(<RedemptionError
      navigation={{
        dispatch: jest.fn(),
        goBack: goBackMock,
        navigate: mockNavigate,
        reset: jest.fn(),
        setOptions: jest.fn(),
      }}
      route={{
        params: { customPropsWarningType },
        key: '',
        name: '',
      }}
    />);
    fireEvent.press(await findByTestId('understood-button'));
    expect(mockNavigate).toHaveBeenCalledWith('BottomTabNavigator');
  });
});
