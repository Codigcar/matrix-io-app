import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import InningButton from '../InningButton';
import { InningButtonProps } from '../../shared/types/components';

const defaultProps: InningButtonProps = {
  isSelected: false,
  buttonText: 'buttonText',
  onPress: jest.fn(),
};

const componentRender = (props: InningButtonProps) => render(<InningButton {...props} />);

describe('InningButton Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render correctly with selected button', () => {
    const component = componentRender({ ...defaultProps, isSelected: true });
    expect(component).toBeTruthy();
  });

  it('should render with correct text', () => {
    const component = componentRender(defaultProps);
    expect(component.getByText('buttonText')).toBeTruthy();
  });
});
