import React from 'react';
import { render, fireEvent } from 'src/matrix-ui-components/utils/test-utils';
import { Linking } from 'react-native';
import { CALL_CENTER_NUMBER } from 'src/utils/constants';
import ForgotPinModal from '../ForgotPinModal';
import { ForgotPinModalProps } from '../../shared/types/components';

const defaultProps: ForgotPinModalProps = {
  isVisible: true,
  onClose: jest.fn(),
  cancelButton: jest.fn(),
  transparent: true,
};

jest.mock('react-native', () => {
  const actualRN = jest.requireActual('react-native');
  return {
    ...actualRN,
    Linking: {
      ...actualRN.Linking,
      openURL: jest.fn(),
    },
  };
});

const componentRender = (props: ForgotPinModalProps) => render(<ForgotPinModal {...props} />);

describe('ForgotPinModal Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render correctly with transparent false', () => {
    const component = componentRender({ ...defaultProps, transparent: false });
    expect(component).toBeTruthy();
  });

  it('should render correctly with onClose undefined', () => {
    const component = componentRender({ ...defaultProps, onClose: undefined });
    expect(component).toBeTruthy();
  });

  it('should press button and openURL', async () => {
    const component = componentRender(defaultProps);
    const button = await component.findByTestId('forgot-pin-modal-button');
    fireEvent.press(button);
    expect(Linking.openURL).toHaveBeenCalledWith(`tel:${CALL_CENTER_NUMBER}`);
  });
});
