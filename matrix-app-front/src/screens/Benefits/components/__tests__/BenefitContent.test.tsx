import React from 'react';
import BenefitContent from 'src/screens/Benefits/components/BenefitContent';
import { render, fireEvent } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';

jest.mock('src/screens/Benefits/components/LocationInDetails', () => 'Location');

describe('BenefitContent', () => {
  const mockCoupon = {
    offerTitle: 'Oferta Especial',
    benefitDetail: 'Detalles del beneficio',
    benefitUse: 'Cómo usar el beneficio',
    codeIO: 'CODE123',
    period: '1 enero - 31 diciembre',
    imgPathLogo: 'path/to/logo.png',
    partnerName: 'Nombre del Socio',
    category: 'Categoría',
    termsConditions: 'Términos y condiciones',
    localAppliesDiscount: [{ local: 'Local 1', location: 'Ubicación 1' }],
  };

  it('should render all coupon information provided', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitContent coupon={mockCoupon} handleCopyCoupon={() => {}} />
      </ThemeProvider>,
    );

    expect(getByText(mockCoupon.offerTitle)).toBeTruthy();
    expect(getByText(mockCoupon.benefitDetail)).toBeTruthy();
    expect(getByText(mockCoupon.benefitUse)).toBeTruthy();
  });

  it('should call handleCopyCoupon when button is pressed in TagCouponBenefits', () => {
    const handleCopyCouponMock = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitContent coupon={mockCoupon} handleCopyCoupon={handleCopyCouponMock} />
      </ThemeProvider>,
    );
    const copyButton = getByTestId('tag-coupon-benefits-button');
    fireEvent.press(copyButton);
    expect(handleCopyCouponMock).toHaveBeenCalled();
  });
});
