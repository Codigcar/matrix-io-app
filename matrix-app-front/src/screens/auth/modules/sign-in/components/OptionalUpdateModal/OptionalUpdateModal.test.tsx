import React from 'react';
import { render, fireEvent } from 'src/matrix-ui-components/utils/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';

import OptionalUpdateModal from './OptionalUpdateModal';

describe('OptionalUpdateModal', () => {
  const mockOnUpdatePress = jest.fn();
  const mockOnOnClose = jest.fn();

  it('should render correctly when open', () => {
    const { getByText } = render(
      <OptionalUpdateModal isOpen onUpdatePress={mockOnUpdatePress} onClose={mockOnOnClose} />,
    );
    expect(getByText(i18n.t('auth:optional-update-modal.title'))).toBeTruthy();
  });

  it('should not render when not open', () => {
    const { queryByText } = render(
      <OptionalUpdateModal
        isOpen={false}
        onUpdatePress={mockOnUpdatePress}
        onClose={mockOnOnClose}
      />,
    );
    expect(queryByText(i18n.t('auth:optional-update-modal.title'))).toBeNull();
  });

  it('should call onUpdatePress when button is pressed', () => {
    const { getByText } = render(
      <OptionalUpdateModal isOpen onUpdatePress={mockOnUpdatePress} onClose={mockOnOnClose} />,
    );
    fireEvent.press(getByText(i18n.t('auth:optional-update-modal.button')));
    expect(mockOnUpdatePress).toHaveBeenCalled();
  });

  it('should call onUpdatePress when close is pressed', () => {
    const { getByText } = render(
      <OptionalUpdateModal isOpen onUpdatePress={mockOnUpdatePress} onClose={mockOnOnClose} />,
    );
    fireEvent.press(getByText(i18n.t('auth:optional-update-modal.close')));
    expect(mockOnOnClose).toHaveBeenCalled();
  });
});
