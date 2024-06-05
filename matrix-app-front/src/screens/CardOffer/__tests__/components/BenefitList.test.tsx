import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as AnalyticsModule from 'src/utils/Analytics';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import { listOffers } from 'src/mocks/offers';
import { i18n } from 'src/utils/core/MTXStrings';
import BenefitList from '../../OfferDetails/components/BenefitList';
import { testID } from '../../shared/strings/testID';

describe('BenefitList Component Tests', () => {
  it('updates analytic route to "CardOfferMoreDetails" when modal is visible', () => {
    const setAnalyticRouteMock = jest
      .spyOn(AnalyticsModule, 'setAnalyticRoute')
      .mockImplementationOnce(jest.fn());

    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitList offer={listOffers[0]} />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId(testID.btnShowInfoId));

    expect(setAnalyticRouteMock).toHaveBeenCalledWith('CardOfferMoreDetails');

    setAnalyticRouteMock.mockRestore();
  });

  it('updates analytic route to "CardOfferDetails" when modal is not visible', () => {
    const setAnalyticRouteMock = jest
      .spyOn(AnalyticsModule, 'setAnalyticRoute')
      .mockImplementationOnce(jest.fn());

    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitList offer={listOffers[0]} />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId(testID.btnShowInfoId));
    fireEvent.press(getByTestId(testID.btnUnderstoodId));

    expect(setAnalyticRouteMock).toHaveBeenCalledWith('CardOfferDetails');

    setAnalyticRouteMock.mockRestore();
  });

  it('toggles modal visibility on button press', () => {
    const { getByTestId, queryByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <BenefitList offer={listOffers[0]} />
      </ThemeProvider>,
    );
    fireEvent.press(getByTestId(testID.btnShowInfoId));

    expect(queryByText(i18n.t('cardOffer:card-offer-benefit-second-list-first-item-item', {
      billingDay: listOffers[0]?.billingDay,
    }))).toBeTruthy();

    fireEvent.press(getByTestId(testID.btnUnderstoodId));

    expect(queryByText(i18n.t('cardOffer:card-offer-benefit-second-list-first-item-item', {
      billingDay: listOffers[0]?.billingDay,
    }))).toBeNull();
  });
});
