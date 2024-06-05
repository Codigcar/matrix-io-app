import React from 'react';
import { render } from 'src/matrix-ui-components/utils/test-utils';
import { BenefitList } from './BenefitList';

const componentRender = render(<BenefitList data={[{ title: 'mockedTitle' }]} />);

describe('BenefitList Component', () => {
  it('should render BenefitList screen without errors', () => {
    expect(componentRender).toBeTruthy();
  });
});
