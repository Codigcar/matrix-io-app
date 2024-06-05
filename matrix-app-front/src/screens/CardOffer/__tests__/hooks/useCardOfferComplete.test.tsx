import { renderHook, act } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import useCardOfferComplete from '../../CardOfferComplete/hooks/useCardOfferComplete';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-native-localize', () => ({
  getLocales: jest.fn().mockReturnValue([{ languageCode: 'es' }]),
}));

jest.mock('src/api/AuthServices', () => ({
  RememberDevice: jest.fn(),
}));

describe('useCardOfferComplete', () => {
  it('should handle onPressContinue correctly', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const navigationMock = {
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    };

    const { result } = renderHook(() =>
      useCardOfferComplete({
        navigation: navigationMock,
      }),
    );

    act(() => {
      result.current.onPressContinue();
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'session/setInactivityTimeout',
      payload: 120,
    });

    expect(navigationMock.navigate).toHaveBeenCalledWith(
      navigationScreenNames.physicalCard.stack,
      {
        screen: navigationScreenNames.physicalCard.introductionRequest,
      },
    );
  });

  it('should handle onPressBackArrow correctly', () => {
    const navigationMock = {
      dispatch: jest.fn(),
      goBack: jest.fn(),
      navigate: jest.fn(),
    };

    const { result } = renderHook(() =>
      useCardOfferComplete({
        navigation: navigationMock,
      }),
    );

    act(() => {
      result.current.onPressBackArrow();
    });

    expect(navigationMock.goBack).toHaveBeenCalled();
  });

  it('should handle getLocale correctly', () => {
    const { result } = renderHook(() =>
      useCardOfferComplete({
        navigation: {
          dispatch: jest.fn(),
          goBack: jest.fn(),
          navigate: jest.fn(),
        },
      }),
    );

    expect(result.current.getLocale()).toBe('es');
  });

  it('should call RememberDevice on mount', () => {
    const { result } = renderHook(() =>
      useCardOfferComplete({
        navigation: {
          dispatch: jest.fn(),
          goBack: jest.fn(),
          navigate: jest.fn(),
        },
      }),
    );

    expect(require('src/api/AuthServices').RememberDevice).toHaveBeenCalled();
  });
});
