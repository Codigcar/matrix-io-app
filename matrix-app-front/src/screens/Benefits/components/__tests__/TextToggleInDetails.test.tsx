import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import TextToggleInDetails from '../TextToggleInDetails';
import 'src/utils/core/MTXStrings';

jest.mock('src/utils/core/MTXStrings', () => ({
  i18n: {
    t: jest.fn().mockImplementation((key) => {
      if (key === 'benefits:show-less') return 'Show less';
      if (key === 'benefits:show-more') return 'Show more';
      return '';
    }),
  },
}));

describe('TextToggleInDetails', () => {
  const longText = 'Very long text that should be truncated when not showing the full text'.repeat(
    5,
  );

  it('should show the truncated text initially with a "Show more" button', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TextToggleInDetails text={longText} />
      </ThemeProvider>,
    );

    expect(getByText('Show more')).toBeTruthy();
    expect(getByText(`${longText.slice(0, 240)}...`)).toBeTruthy();
  });

  it('should show the full text and change the button to "Show less" when pressing "Show more"', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TextToggleInDetails text={longText} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText('Show more'));
    expect(getByText('Show less')).toBeTruthy();
    expect(getByText(longText)).toBeTruthy();
  });

  it('should re-display truncated text when pressing "Show less"', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <TextToggleInDetails text={longText} />
      </ThemeProvider>,
    );

    fireEvent.press(getByText('Show more'));
    fireEvent.press(getByText('Show less'));

    expect(getByText('Show more')).toBeTruthy();
    expect(getByText(`${longText.slice(0, 240)}...`)).toBeTruthy();
  });
});
