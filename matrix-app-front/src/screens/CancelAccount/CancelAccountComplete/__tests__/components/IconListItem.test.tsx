import React from 'react';
import { testID } from 'src/screens/CancelAccount/shared/strings/testID';
import { IconListItemPropsType } from 'src/screens/CancelAccount/types/component';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import IconListItem from '../../components/IconListItem';

const mainComponentTestId = testID.iconListItem;

const ComponentRender = (props: IconListItemPropsType) => render(<IconListItem {...props} />);

describe('IconListItem Component', () => {
  it('should render IconListItem component', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: true,
      type: 1,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component without subtitle', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      hasValue: true,
      type: 1,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component without value', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: false,
      type: 1,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component without subtitle and value', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      hasValue: false,
      type: 1,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component with type 1', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: true,
      type: 1,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component with type 2', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: true,
      type: 2,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component with type 3', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: true,
      type: 3,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });

  it('should render IconListItem component with type 4', () => {
    const { getByTestId } = ComponentRender({
      label: 'label',
      subtitle: 'subtitle',
      hasValue: true,
      type: 4,
      value: 'value',
      testID: mainComponentTestId,
    });
    expect(getByTestId(mainComponentTestId)).toBeTruthy();
  });
});
