import React from 'react';
import { render } from 'jest/test-utils';
import { ReplacementValidationErrorScreen } from '../replacement-validation-error.screen';

const componentRender = render(<ReplacementValidationErrorScreen />);

describe('ReplacementValidationError Screen', () => {
  it('should render ReplacementValidationError screen without errors', () => {
    expect(componentRender).toBeTruthy();
  });
});
