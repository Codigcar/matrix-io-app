import React from 'react';
import { render, waitFor } from 'src/matrix-ui-components/utils/test-utils';
import PhoneForm from '../phoneForm';
import { PhoneFormProps } from '../../shared/types/components';

const defaultProps: PhoneFormProps = {
  onSubmit: jest.fn(),
  phoneNumber: null,
};

const componentRender = (props: PhoneFormProps) => render(<PhoneForm {...props} />);

describe('PhoneForm Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    waitFor(() => {
      expect(component).toBeTruthy();
    });
  });

  it('should render with a phone number', () => {
    const component = componentRender({ ...defaultProps, phoneNumber: '964829659' });
    waitFor(() => {
      expect(component).toBeTruthy();
    });
  });
});
