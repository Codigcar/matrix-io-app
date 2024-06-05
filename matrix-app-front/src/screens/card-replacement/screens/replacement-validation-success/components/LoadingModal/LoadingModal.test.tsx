import React from 'react';
import { RenderResult, render } from 'jest/test-utils';
import { LoadingModalProps } from 'src/screens/card-replacement/shared/types/component';
import { LoadingModal } from './LoadingModal';

const ComponentRender = (props: LoadingModalProps) => render(<LoadingModal {...props} />);

let componentRendered: RenderResult;

describe('LoadingAnimation Component', () => {
  beforeEach(() => {
    componentRendered = ComponentRender({ isVisible: true });
  });

  it('should render correctly', () => {
    expect(componentRendered).toBeTruthy();
  });
});
