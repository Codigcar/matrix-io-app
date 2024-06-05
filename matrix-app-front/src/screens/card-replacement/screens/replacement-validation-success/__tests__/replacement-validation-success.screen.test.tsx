import { render, renderHook, act } from 'jest/test-utils';
import React from 'react';
import { Provider } from 'react-redux';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import { useReplacementValidationSuccessPresenter } from '../replacement-validation-success.presenter';
import { ReplacementValidationSuccessScreen } from '../replacement-validation-success.screen';

const store = configureStore()({ ...INITIAL_STORE_MOCK });

const componentRender = () => render(<ReplacementValidationSuccessScreen />);

jest.mock('@react-navigation/native');

describe('ReplacementValidationSuccess Screen', () => {
  beforeEach(() => {
    componentRender();
  });

  it('should render without errors', () => {
    expect(componentRender).toBeTruthy();
  });

  it('should render loading correctly', () => {
    const { result } = renderHook(() => useReplacementValidationSuccessPresenter(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.setLoading(true);
    });

    expect(result.current.loading).toBe(true);
  });
});
