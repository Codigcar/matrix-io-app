import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import CheckLinksInText from '../CheckLinksInText';

jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    Linking: {
      ...actualReactNative.Linking,
      openURL: jest.fn(),
    },
  };
});

describe('CheckLinksInText', () => {
  it('should return null when text is undefined', () => {
    const { baseElement } = render(<CheckLinksInText text={undefined} />);
    expect(baseElement).toBeUndefined();
  });

  it('should correctly process text with URLs', () => {
    const text = 'Visita https://example.com. Gracias.';
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <CheckLinksInText text={text} />
      </ThemeProvider>,
    );
    expect(getByText('example.com')).toBeTruthy();
  });
});
