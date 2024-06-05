import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import { DataListPropsType } from 'src/types/types';
import DataListComplete from '../../components/DataListComplete';

const componentRenderProps: DataListPropsType = {
  requestDate: 'requestDate',
  requestTime: 'requestTime',
  maskedCard: 'maskedCard',
  pendingCreditBalance: 0,
  pendingPayment: 'pendingPayment',
};

const ComponentRender = (props: DataListPropsType) => render(<DataListComplete {...props} />);

describe('DataListComplete Component', () => {
  it('should render DataListComplete component', () => {
    const componentRendered = ComponentRender(componentRenderProps);
    expect(componentRendered).toBeTruthy();
  });

  it('should render DataListComplete component with 0 in pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...componentRenderProps,
      pendingCreditBalance: 0,
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render DataListComplete component with 1 in pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...componentRenderProps,
      pendingCreditBalance: 1,
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render DataListComplete component with nothing in pendingPayment', () => {
    const componentRendered = ComponentRender({
      ...componentRenderProps,
      pendingPayment: '',
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render DataListComplete component with something in pendingPayment', () => {
    const componentRendered = ComponentRender({
      ...componentRenderProps,
      pendingPayment: '1000',
      pendingCreditBalance: 0,
    });
    expect(componentRendered).toBeTruthy();
  });

  it('should render DataListComplete component with nothing in pendingPayment and pendingCreditBalance', () => {
    const componentRendered = ComponentRender({
      ...componentRenderProps,
      pendingPayment: '',
      pendingCreditBalance: 0,
    });
    expect(componentRendered).toBeTruthy();
  });
});
