import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import EnrollmentWalletDone from '../components/EnrollmentWalletDone';
import { i18n } from 'src/utils/core/MTXStrings';

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  dispatch: jest.fn(),
  reset: jest.fn(),
};

const route = {
  params: undefined,
  key: '',
  name: ''
}

describe('EnrollmentWalletDone Component', () => {
  it('displays InfoCardWallet with correct data', () => {
    const { getByTestId, getByText } = render(
      <EnrollmentWalletDone navigation={mockNavigation}
      route={route} />
    );

    const infoCardWallet = getByTestId('info-card-wallet');
    expect(infoCardWallet).toBeTruthy();
    const activeStatusText = i18n.t('wallet:wallet-flow.googlePay.affiliate.active');
    expect(getByText(activeStatusText)).toBeTruthy();
  });

  it('navigates back to "Home" when the "Back" button is pressed', () => {
    
    const { getByText } = render(
      <EnrollmentWalletDone navigation={mockNavigation} 
      route={route} />
    );

    const backButton = getByText('Terminar');
    fireEvent.press(backButton);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
  });
});


