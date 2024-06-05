import React from 'react';
import { RenderResult, render } from 'jest/test-utils';
import { LoadingAnimation } from './LoadingAnimation';

const ComponentRender = () => render(<LoadingAnimation />);

let componentRendered: RenderResult;

describe('LoadingAnimation Component', () => {
  beforeEach(() => {
    componentRendered = ComponentRender();
  });

  it('should render correctly', () => {
    expect(componentRendered).toBeTruthy();
  });
});
