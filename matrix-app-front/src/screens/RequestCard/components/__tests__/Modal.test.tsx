import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import { Text } from 'react-native';
import Modal from '../Modal';
import { ModalProps } from '../../shared/types/components';

const defaultProps: ModalProps = {
  children: <Text>ExampleText</Text>,
  onClose: () => {},
  title: '',
};

const componentRender = (props: ModalProps) => render(<Modal {...props} />);

describe('Modal Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render with correct title', () => {
    const component = componentRender({ ...defaultProps, title: 'title' });
    expect(component.getByText('title')).toBeTruthy();
  });

  it('should render with correct children', () => {
    const component = componentRender({ ...defaultProps, children: <Text>ExampleText</Text> });
    expect(component.getByText('ExampleText')).toBeTruthy();
  });
});
