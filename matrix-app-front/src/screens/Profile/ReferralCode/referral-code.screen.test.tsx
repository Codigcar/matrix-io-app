import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking } from 'react-native';
import { fireEvent, render, waitFor } from 'jest/test-utils';
import ReferralCodeScreen from './referral-code.screen';

const MOCK_CODE = 'MATRIX';
const mockGetReferralCode = jest.fn().mockResolvedValue({ code: MOCK_CODE });
const mockShareCode = jest.fn();
const mockCopyCode = jest.fn();

jest.mock('src/core/modules/referrals/domain/use-case/get-referral-code.use-case', () =>
  jest.fn().mockImplementation(() => ({ execute: mockGetReferralCode })));

jest.mock('src/core/modules/share/domain/use-case/share-options.use-case', () =>
  jest.fn().mockImplementation(() => ({ execute: mockShareCode })));

jest.mock('src/core/modules/clipboard/domain/use-case/copy-text.use-case', () =>
  jest.fn().mockImplementation(() => ({ execute: mockCopyCode })));

Linking.openURL = jest.fn();
const AuthStack = createNativeStackNavigator();

describe('Referral code', () => {
  const component = (
    <AuthStack.Navigator>
      <AuthStack.Screen name="ReferralCode" component={ReferralCodeScreen} />
    </AuthStack.Navigator>
  );
  it('should open up the terms and conditions link', async () => {
    const termsUrl = 'https://www.io.pe/terminos-condiciones-promo/';
    const { findByText } = render(component);
    const termsLink = await findByText('términos y condiciones');
    fireEvent.press(termsLink);
    expect(Linking.openURL).toHaveBeenCalledWith(termsUrl);
  });

  it('should get the referral code', async () => {
    const { queryByText } = render(component);
    await waitFor(() => {
      expect(queryByText(MOCK_CODE)).toBeTruthy();
    });
  });

  it('should call the share code fn', async () => {
    const { findByText } = render(component);
    const shareButton = await findByText('Compartir código');
    fireEvent.press(shareButton);
    expect(mockShareCode).toHaveBeenCalled();
  });

  it('should call the copy code fn', async () => {
    const { findByText } = render(component);
    const copyButton = await findByText('Copiar');
    fireEvent.press(copyButton);
    expect(mockCopyCode).toHaveBeenCalledWith(MOCK_CODE);
  });
});
