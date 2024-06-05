import Helpers from './Helpers';

describe('Update Borrower Application Info ', () => {
  test.each`
    money                   | expected
    ${33.92}                | ${'S/33.92'}
    ${-33.92}               | ${'-S/33.92'}
    ${'-33.92'}             | ${'-S/33.92'}
    ${'Not Expected Value'} | ${'Not Expected Value'}
    ${null}                 | ${'S/0.00'}
  `('it should format currency from $money to $expected ', async ({ money, expected }) => {
    const formattedCurrency = Helpers.formatCurrency(money);
    expect(formattedCurrency).toBe(expected);
  });

  test.each`
    money                   | expected
    ${33.92}                | ${'+S/33.92'}
    ${-33.92}               | ${'-S/33.92'}
    ${'-33.92'}             | ${'-S/33.92'}
    ${'Not Expected Value'} | ${'Not Expected Value'}
    ${null}                 | ${'S/0.00'}
  `('it should show plus sign from $money to $expected ', async ({ money, expected }) => {
    const formattedCurrency = Helpers.formatCurrency(money, { showPlusSign: true });
    expect(formattedCurrency).toBe(expected);
  });

  test.each`
    money                   | expected
    ${1000}                 | ${'S/1,000'}
    ${-33.92}               | ${'-S/33.92'}
    ${'-3000'}              | ${'-S/3,000'}
    ${'Not Expected Value'} | ${'Not Expected Value'}
    ${null}                 | ${'S/0'}
  `(
    'it should hide decimals when round value is given sign from $money to $expected ',
    async ({ money, expected }) => {
      const formattedCurrency = Helpers.formatCurrency(money, { removeDecimalsWhenRounded: true });
      expect(formattedCurrency).toBe(expected);
    },
  );

  test.each`
    time              | expected
    ${'13:23'}        | ${'01:23 pm'}
    ${' 12:45'}       | ${'12:45 pm'}
    ${null}           | ${'-'}
    ${'invalid date'} | ${'-'}
  `('it should format time to am/pm', ({ time, expected }) => {
    expect(Helpers.formatDefaultTime(time)).toBe(expected);
  });
});
