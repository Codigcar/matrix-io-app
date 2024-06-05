import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import TitleTextInDetails from '../TitleTextInDetails';

describe('TitleTextInDetails', () => {
  it('should render the provided text', () => {
    const testText = 'Prueba de Texto';
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TitleTextInDetails text={testText} />
      </ThemeProvider>,
    );

    const foundTextElement = getByText(testText);
    expect(foundTextElement).not.toBeNull();
    expect(foundTextElement.props.children).toEqual(testText);
  });
});
