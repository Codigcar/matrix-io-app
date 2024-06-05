import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import SubTitleTextInDetails from '../SubTitleTextInDetails';

describe('SubTitleTextInDetails', () => {
  it('should render the provided text', () => {
    const testText = 'Texto de prueba';
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <SubTitleTextInDetails text={testText} />
      </ThemeProvider>,
    );
    expect(getByText(testText)).toBeTruthy();
  });
});
