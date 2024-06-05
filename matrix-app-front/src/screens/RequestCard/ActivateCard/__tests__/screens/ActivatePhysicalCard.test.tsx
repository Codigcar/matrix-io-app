import React from 'react';
import { NavigationPropsType } from 'src/types/types';
import { render, renderHook } from 'src/matrix-ui-components/utils/test-utils';
import ActivatePhysicalCard from '../../screens/ActivatePhysicalCard';
import useActivateCard from '../../hooks/useActivateCard';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn().mockReturnValue(true),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: jest.fn().mockReturnValue({ top: 0, bottom: 0 }),
}));

const defaultProps: NavigationPropsType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
    setOptions: jest.fn(),
    push: jest.fn(),
  },
  route: {
    params: {
      orderId: '123456789',
    },
    key: '',
    name: '',
  },
};

const componentRender = (props: NavigationPropsType) => render(<ActivatePhysicalCard {...props} />);

describe('ActivateCardResponseScreen Screen', () => {
  it('should render ActivateCardResponseScreen screen', () => {
    const component = componentRender(defaultProps);
    expect(component).toBeTruthy();
  });

  it('should render with useChangePin Hook', () => {
    componentRender(defaultProps);
    const { result } = renderHook(() => useActivateCard(defaultProps));
    expect(result.current).toBeTruthy();
  });
});
