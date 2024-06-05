import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import CheckListItem from 'src/screens/CardOffer/OfferDetails/components/CheckListItem';
import { CheckListItemProps } from 'src/screens/card-replacement/shared/types/component';

const componentRender = (props: CheckListItemProps) => render(<CheckListItem {...props} />);

describe('CheckListItem Component', () => {
  it('should render CheckListItem screen without errors', () => {
    expect(componentRender).toBeTruthy();
  });

  it('should render CheckListItem screen with label', () => {
    const labelExample = 'label';
    const { getByText } = componentRender({ label: labelExample });
    expect(getByText(labelExample)).toBeTruthy();
  });
});
