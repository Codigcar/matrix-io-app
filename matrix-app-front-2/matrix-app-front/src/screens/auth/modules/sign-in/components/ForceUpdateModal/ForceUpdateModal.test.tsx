import React from 'react';
import { render, fireEvent } from 'src/matrix-ui-components/utils/test-utils';
import { i18n } from 'src/utils/core/MTXStrings';

import ForceUpdateModal from './ForceUpdateModal';

describe('ForceUpdateModal', () => {
  const mockOnUpdatePress = jest.fn();

  it('should render correctly when open', () => {
    const { getByText } = render(<ForceUpdateModal isOpen onUpdatePress={mockOnUpdatePress} />);
    expect(getByText(i18n.t('force-update.modal.title'))).toBeTruthy();
  });

  it('should not render when not open', () => {
    const { queryByText } = render(<ForceUpdateModal isOpen={false} onUpdatePress={mockOnUpdatePress} />);
    expect(queryByText(i18n.t('force-update.modal.title'))).toBeNull();
  });

  it('should call onUpdatePress when button is pressed', () => {
    const { getByText } = render(<ForceUpdateModal isOpen onUpdatePress={mockOnUpdatePress} />);
    fireEvent.press(getByText(i18n.t('force-update.modal.button')));
    expect(mockOnUpdatePress).toHaveBeenCalled();
  });
});
