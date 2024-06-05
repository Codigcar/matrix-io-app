import React from 'react';
import { render } from 'jest/test-utils';
import { ReplacementValidationSuccessScreen } from '../../replacement-validation-success/replacement-validation-success.screen';

jest.mock('src/api/Onboarding', () => ({
  onboardingData: jest.fn(),
}));

jest.mock('@react-navigation/native');

const componentRender = () => render(<ReplacementValidationSuccessScreen />);

describe('ReplacementValidationSuccess Screen', () => {
  it('should render ReplacementValidationSuccess screen without errors', () => {
    expect(componentRender()).toBeTruthy();
  });
});
