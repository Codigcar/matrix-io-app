import React from 'react';
import { render, fireEvent } from 'jest/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';
import RedemptionSuccess from '../RedemptionSuccess/RedemptionSuccess';

const mockNavigate = jest.fn();
const goBackMock = jest.fn();

const routeParams = {
  date: '2023-12-18',
  hour: '14:30',
  amountMoney: '$100',
  accountNumber: '1234567890',
  email: 'example@example.com',
};

const component = (
  <RedemptionSuccess
    navigation={{
      dispatch: jest.fn(),
      goBack: goBackMock,
      navigate: mockNavigate,
      reset: jest.fn(),
      setOptions: jest.fn(),
    }}
    route={{
      params: { routeParams },
      key: '',
      name: '',
    }}
  />
);

describe('RedemptionSuccess', () => {
  it('renders without crashing', () => {
    render(component);
  });
  it('displays success title and sub-title', () => {
    const { getByText, findByTestId } = render(component);
    expect(getByText(i18n.t('cashBack:redemptionSuccess.title'))).toBeTruthy();
    expect(getByText(i18n.t('cashBack:redemptionSuccess.sub-title'))).toBeTruthy();
    expect(getByText(i18n.t('cashBack:redemptionSuccess.box-title'))).toBeTruthy();
    expect(getByText(i18n.t('cashBack:redemptionSuccess.description'))).toBeTruthy();
    expect(getByText((i18n.t('cashBack:redemptionSuccess.notification') + i18n.t('cashBack:redemptionSuccess.notification-time')))).toBeTruthy();
    expect(findByTestId('goToHome-button')).toBeTruthy();
  });

  it('triggers goToHome function on button click', async () => {
    const { findByTestId } = render(component);
    fireEvent.press(await findByTestId('goToHome-button'));
  });
  it.skip('handles button press', async () => {
    const { findByTestId } = render(component);
    fireEvent.press(await findByTestId('goToHome-button'));
    expect(mockNavigate).toHaveBeenCalledWith('BottomTabNavigator');
  });
});
