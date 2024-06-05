import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import { SignOut } from 'src/api/AuthServices';
import { logout } from 'src/utils/auth/states/signInStates';
import useNoCardOffer from '../../NoCardOffer/hooks/useNoCardOffer';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('src/api/AuthServices', () => ({
  SignOut: jest.fn(),
}));

describe('useNoCardOffer', () => {
  it('should handle onPressContinue correctly', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const goBackMock = jest.fn();
    const { result } = renderHook(() => useNoCardOffer({ navigation: { goBack: goBackMock } }));

    act(() => {
      result.current.onPressContinue();
    });

    expect(SignOut).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it('should handle onPressBackArrow correctly', () => {
    const goBackMock = jest.fn();
    const { result } = renderHook(() => useNoCardOffer({ navigation: { goBack: goBackMock } }));

    act(() => {
      result.current.onPressBackArrow();
    });

    expect(goBackMock).toHaveBeenCalled();
  });
});
