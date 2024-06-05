import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from '@shopify/restyle';
import { rebrandingTheme } from 'matrix-ui-components';
import OfferAdditionalModal from '../../OfferDetails/components/OfferAdditionalModal';
import { testID } from '../../shared/strings/testID';

describe('OfferAdditionalModal Component Tests', () => {
  const defaultProps = {
    isVisible: true,
    onClose: jest.fn(),
    title: 'Test Modal',
    children: 'Test Content',
  };

  it('renders OfferAdditionalModal component with provided props', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <OfferAdditionalModal {...defaultProps} />
      </ThemeProvider>,
    );
    const titleText = getByText(defaultProps.title);

    expect(titleText).toBeTruthy();
  });

  it('calls onClose when close button is pressed', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <OfferAdditionalModal {...defaultProps} />
      </ThemeProvider>,
    );
    const closeButton = getByTestId(testID.closeButtonId);

    fireEvent.press(closeButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('does not render if isVisible is false', () => {
    const { queryByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <OfferAdditionalModal {...defaultProps} isVisible={false} />
      </ThemeProvider>,
    );
    const titleText = queryByText(defaultProps.title);
    const contentText = queryByText(defaultProps.children);

    expect(titleText).toBeNull();
    expect(contentText).toBeNull();
  });

  it('calls onClose when onRequestClose is triggered', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <OfferAdditionalModal {...defaultProps} testID="modal-component" />
      </ThemeProvider>,
    );
    const modalComponent = getByTestId('modal-component');

    fireEvent(modalComponent, 'requestClose');

    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
