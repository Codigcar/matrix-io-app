import React from 'react';
import { render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import CardsList from './CardsList';

describe('CardList', () => {
  test('should render correctly ', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <CardsList
          cards={[]}
          onSelect={() => {}}
          cardSelected={null}
          loading={false}
          navigate={() => {}}
        />
      </ThemeProvider>,
    );
    const cardList = getByTestId('card-list');
    expect(cardList).toBeDefined();
  });
});
