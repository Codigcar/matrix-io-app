import { validateCardNumber, checkCreditCard } from './checkCreditCard';

// Mocks for i18n translations
jest.mock('./core/MTXStrings', () => ({
  i18n: {
    t: jest.fn((key: string) => key),
  },
}));

describe('Credit Card Validation', () => {
  // Pruebas para validateCardNumber
  test('validateCardNumber should accept valid card numbers', () => {
    expect(validateCardNumber('4111111111111111')).toBe(true); // Visa
    expect(validateCardNumber('5500000000000004')).toBe(true); // MasterCard
  });

  test('validateCardNumber should reject invalid card numbers', () => {
    expect(validateCardNumber('4111')).toBe(false);
    expect(validateCardNumber('abcde')).toBe(false);
  });

  // Pruebas para checkCreditCard
  test('checkCreditCard should identify card type and validate', () => {
    expect(checkCreditCard('4111111111111111')).toEqual({
      success: true,
      message: null,
      type: 'Visa',
      icon: 'visaLogo',
    });
    expect(checkCreditCard('5500000000000004')).toEqual({
      success: true,
      message: null,
      type: 'MasterCard',
      icon: 'masterCard',
    });
  });

  test('checkCreditCard should return errors for invalid cards', () => {
    expect(checkCreditCard('4111')).toEqual({
      success: false,
      message: 'paymentMethod.errorsCard.invalidCardNumber',
      type: null,
      icon: '',
    });
  });

  test('checkCreditCard should handle empty input', () => {
    expect(checkCreditCard('')).toEqual({
      success: false,
      message: 'paymentMethod.errorsCard.emptyCardNumber',
      type: null,
      icon: '',
    });
  });
});
