import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { RenderResult, render } from 'jest/test-utils';
import CancelAccountBenefits from '../../CancelAccountBenefits';

const ComponentRenderProps: NavigationPropsType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
  },
  route: {
    params: {},
    key: '',
    name: '',
  },
};

let componentRendered: RenderResult;

const ComponentRender = (props: NavigationPropsType) =>
  render(<CancelAccountBenefits {...props} />);

describe('CancelAccountBenefits Component', () => {
  beforeEach(() => {
    componentRendered = ComponentRender(ComponentRenderProps);
  });

  it('should render CancelAccountBenefits component', () => {
    expect(componentRendered).toBeTruthy();
  });
});
