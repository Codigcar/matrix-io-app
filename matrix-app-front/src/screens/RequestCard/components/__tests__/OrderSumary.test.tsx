import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import OrderSumary from '../OrderSumary';
import { OrderSumaryProps } from '../../shared/types/components';

const defaultProps: OrderSumaryProps = {
  name: '',
  date: '',
  hour: '',
  address: '',
  addressLabel: '',
  phoneNumber: '',
};

const componentRender = (props: OrderSumaryProps) => render(<OrderSumary {...props} />);

describe('OrderSumary Component', () => {
  it('should render correctly', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render with correct name', () => {
    const component = componentRender({ ...defaultProps, name: 'Miguel' });
    expect(component.getByText('Miguel')).toBeTruthy();
  });

  it('should render with correct hour', () => {
    const component = componentRender({ ...defaultProps, hour: '6:00 pm' });
    expect(component.getByText('6:00 pm')).toBeTruthy();
  });

  it('should render with correct address', () => {
    const component = componentRender({ ...defaultProps, address: 'Cra 2 # 45 -45' });
    expect(component.getByText('Cra 2 # 45 -45')).toBeTruthy();
  });

  it('should render with correct addressLabel', () => {
    const component = componentRender({ ...defaultProps, addressLabel: 'Michigan' });
    expect(component.getByText('Michigan')).toBeTruthy();
  });

  it('should render with correct phoneNumber', () => {
    const component = componentRender({ ...defaultProps, phoneNumber: '+57 300 123 4567' });
    expect(component.getByText('+57 300 123 4567')).toBeTruthy();
  });
});
