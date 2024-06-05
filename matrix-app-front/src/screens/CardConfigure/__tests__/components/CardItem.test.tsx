import React from 'react';
import { render } from 'jest/test-utils';
import { Text } from 'matrix-ui-components';
import CardItem from '../../components/CardItem';
import { testID } from '../../shared/strings/testID';

const mainComponentTestId = testID.cardItem;
const childrenTextValue = 'Children text value example';

const ComponentRender = () =>
  render(
    <CardItem testID={mainComponentTestId}>
      <Text>{childrenTextValue}</Text>
    </CardItem>,
  );

describe('CardItem component', () => {
  it('should render without errors', () => {
    const { getByTestId } = ComponentRender();
    const component = getByTestId(mainComponentTestId);
    expect(component).toBeTruthy();
  });

  it('should render children', () => {
    const { getByText } = ComponentRender();
    const component = getByText(childrenTextValue);
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    const { toJSON } = ComponentRender();
    expect(toJSON()).toMatchSnapshot();
  });
});
