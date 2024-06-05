import React from 'react';
import { render } from '@testing-library/react-native';
import { i18n } from 'src/utils/core/MTXStrings';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import Load from '../../components/Load';
import { string } from '../../shared/strings/string';

describe('Load Component Tests', () => {
  it('renders Load component with loadingOffer type', async () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Load type="loadingOffer" />
      </ThemeProvider>,
    );
    const title = getByText(string.cardOfferModalsLoadingOfferTitle);
    const subtitle = getByText(string.cardOfferModalsLoadingOfferSubtitle);

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });

  it('renders Load component with generatingCard type', async () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Load type="generatingCard" />
      </ThemeProvider>,
    );
    const title = getByText(i18n.t('cardReissue.load.generating-card-title'));
    const subtitle = getByText(i18n.t('cardReissue.load.generating-card-subtitle'));

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });

  it('renders Load component with default type', async () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <Load type="someOtherType" />
      </ThemeProvider>,
    );
    const title = getByText(string.cardOfferModalsLoadingAuthorizationTitle);
    const subtitle = getByText(string.cardOfferModalsLoadingAuthorizationSubtitle);

    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });
});
