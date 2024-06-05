import React from 'react';
import { render, fireEvent } from 'jest/test-utils';
import { PaymentError } from '../payment-error.screen';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn((key) => key),
  },
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: {
        /* los params que esperas */
      },
    }),
  };
});

describe('PaymentError Component', () => {
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();
  const mockDispatch = jest.fn();
  const mockReset = jest.fn();

  const defaultProps = {
    navigation: {
      navigate: mockNavigate,
      goBack: mockGoBack,
      dispatch: mockDispatch,
      reset: mockReset,
    },
    route: {
      params: {},
      key: 'someKey',
      name: 'someName',
    },
  };

  it('should render correctly with default props', () => {
    const { getByText } = render(<PaymentError {...(defaultProps as any)} />);

    expect(getByText('cardPayment.screen-error-title')).toBeDefined();
  });

  xit('should render title, subtitle, and description if provided', () => {
    const customProps = {
      ...defaultProps,
      route: {
        params: {
          title: 'Test Title',
          subtitle: 'Test Subtitle',
          description: 'Test Description',
        },
        key: 'someKey',
        name: 'someName',
      },
    };
    const { getByText } = render(<PaymentError {...(customProps as any)} />);

    expect(getByText('Test Title')).toBeDefined();
    expect(getByText('Test Subtitle')).toBeDefined();
    expect(getByText('Test Description')).toBeDefined();
  });

  xit('should navigate when primary action button is pressed', () => {
    const customProps = {
      ...defaultProps,
      route: {
        params: {
          primaryAction: {
            label: 'Primary Action',
            nextScreen: 'NextScreen',
          },
        },
        key: 'someKey',
        name: 'someName',
      },
    };
    const { getByText } = render(<PaymentError {...(customProps as any)} />);
    const primaryButton = getByText('Primary Action');

    fireEvent.press(primaryButton);
    expect(getByText).toBeDefined();
  });
});
