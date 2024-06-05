import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import ErrorChangePinSdkModal from '../ErrorChangePinSdkModal';
import { ErrorChangePinSdkModalProps } from '../../shared/types/components';

const defaultProps: ErrorChangePinSdkModalProps = {
  isVisible: true,
  onClose: jest.fn(),
  cancelButton: jest.fn(),
  transparent: true,
  afterActivate: true,
};

const componentRender = (props: ErrorChangePinSdkModalProps) =>
  render(<ErrorChangePinSdkModal {...props} />);

describe('ErrorChangePinSdkModal Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render correctly with afterActivate false', () => {
    const component = componentRender({ ...defaultProps, afterActivate: false });
    expect(component).toBeTruthy();
  });
});
