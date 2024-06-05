import React from 'react';
import { render } from 'jest/test-utils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CardPayment } from '../payment.screen';

jest.mock('@react-navigation/native');

const component = <CardPayment />;

describe('CardPayment screen', () => {
  const mockUseNavigation = useNavigation as jest.Mock;
  const mockUseRoute = useRoute as jest.Mock;
  mockUseRoute.mockReturnValue({ params: {} });
  mockUseNavigation.mockReturnValue({
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    reset: jest.fn(),
  });
  it('renders the loading state correctly', () => {
    const { toJSON } = render(component);
    expect(toJSON()).toBeDefined();
  });
});
