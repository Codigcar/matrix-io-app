import React from 'react';
import { render } from '@testing-library/react-native';
import { CARD_IS_INACTIVE, CARD_IS_OPEN, CARD_REQUIRE_CHANGE_PIN } from 'src/utils/constants';
import { colors, rebrandingTheme } from 'src/matrix-ui-components/theme/themes/rebranding-theme';
import { ThemeProvider } from '@shopify/restyle';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import ChipStatus from '../../components/ChipStatus';

describe('ChipStatus Component', () => {
  const renderChipStatus = (state: string) =>
    render(
      <ThemeProvider theme={rebrandingTheme}>
        <ChipStatus state={state} />
      </ThemeProvider>,
    );

  it('renders correctly for CARD_IS_OPEN state', () => {
    const { getByTestId, getByText } = renderChipStatus(CARD_IS_OPEN);

    expect(getByTestId('chip-container')).toBeTruthy();

    const chipColor = getByTestId('chip-color');
    expect(chipColor).toHaveStyle({ backgroundColor: colors.success });
    expect(getByText(string.cardInfoActive)).toBeTruthy();
  });

  it('renders correctly for CARD_IS_INACTIVE state', () => {
    const { getByTestId, getByText } = renderChipStatus(CARD_IS_INACTIVE);

    expect(getByTestId('chip-container')).toBeTruthy();

    const chipColor = getByTestId('chip-color');
    expect(chipColor).toHaveStyle({ backgroundColor: colors.FeedbackWarning600 });
    expect(getByText(string.cardInfoInactive)).toBeTruthy();
  });

  it('renders correctly for other states', () => {
    const { getByTestId, getByText } = renderChipStatus(CARD_REQUIRE_CHANGE_PIN);

    expect(getByTestId('chip-container')).toBeTruthy();

    const chipColor = getByTestId('chip-color');
    expect(chipColor).toHaveStyle({ backgroundColor: colors.primary500 });
    expect(getByText(string.cardInfoPending)).toBeTruthy();
  });
});
