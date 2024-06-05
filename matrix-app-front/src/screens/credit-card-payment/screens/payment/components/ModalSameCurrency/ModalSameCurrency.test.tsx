import React from 'react';
import { render } from 'jest/test-utils';
import { rebrandingTheme } from 'src/matrix-ui-components';
import { ThemeProvider } from '@shopify/restyle';
import ModalSameCurrency from './ModalSameCurrency';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn((key) => key),
  },
}));

describe('ModalSameCurrency Component', () => {
  it('renders correctly', () => {
    const props = {
      isVisible: true,
      onClose: true,
    };

    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <ModalSameCurrency {...props} />
      </ThemeProvider>,
    );

    expect(getByTestId('modalSameCurrency')).toBeDefined();
  });
});
