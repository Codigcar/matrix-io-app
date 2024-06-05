import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import InactiveCardModal from '../InactiveCardModal';
import { InactiveCardModalProps } from '../../shared/types/components';

const defaultProps: InactiveCardModalProps = {
  isVisible: false,
  goConfigureButton: jest.fn(),
  cancelButton: jest.fn(),
  isVirtual: false,
};

const componentRender = (props: InactiveCardModalProps) => render(<InactiveCardModal {...props} />);

describe('InactiveCardModal Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render correctly with virtual card', () => {
    const component = componentRender({ ...defaultProps, isVirtual: true });
    expect(component).toBeTruthy();
  });

  it('should render correctly with visible modal', () => {
    const component = componentRender({ ...defaultProps, isVisible: true });
    expect(component).toBeTruthy();
  });
});
