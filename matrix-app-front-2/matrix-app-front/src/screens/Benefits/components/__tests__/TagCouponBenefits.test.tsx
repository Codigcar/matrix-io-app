import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import TagCouponBenefits from '../TagCouponBenefits';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn().mockReturnValue('Copy to clipboard'),
  },
}));

describe('TagCouponBenefits', () => {
  it('should not render anything if couponCode is an empty string', () => {
    const { baseElement } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TagCouponBenefits couponCode="" handleCopyCoupon={() => {}} />
      </ThemeProvider>,
    );
    expect(baseElement).toBeUndefined();
  });

  it('should render coupon code and link text to copy to clipboard', () => {
    const testCouponCode = '123ABC';
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TagCouponBenefits couponCode={testCouponCode} handleCopyCoupon={() => {}} />
      </ThemeProvider>,
    );
    expect(getByText(testCouponCode)).toBeTruthy();
    expect(getByText('Copy to clipboard')).toBeTruthy();
  });

  it('should calls handleCopyCoupon when pressing the link text', () => {
    const handleCopyCouponMock = jest.fn();
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TagCouponBenefits couponCode="123ABC" handleCopyCoupon={handleCopyCouponMock} />
      </ThemeProvider>,
    );
    fireEvent.press(getByText('Copy to clipboard'));
    expect(handleCopyCouponMock).toHaveBeenCalled();
  });
});
