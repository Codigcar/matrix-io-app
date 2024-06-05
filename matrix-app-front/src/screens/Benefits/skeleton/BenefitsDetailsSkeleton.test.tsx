import React from 'react';
import { render } from '@testing-library/react-native';
import BenefitsDetailsSkeleton from './BenefitsDetailsSkeleton';

describe('BenefitsDetailsSkeleton', () => {
  it('should renders correctly', () => {
    render(<BenefitsDetailsSkeleton isVisible />);
  });
});
