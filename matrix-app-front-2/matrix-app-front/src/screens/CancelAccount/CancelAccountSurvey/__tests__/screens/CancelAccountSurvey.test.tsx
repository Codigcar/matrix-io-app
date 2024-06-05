import {
  render, renderHook, act, waitFor,
} from 'jest/test-utils';
import { INITIAL_STORE_MOCK } from 'src/mocks/redux';
import configureStore from 'redux-mock-store';
import React from 'react';
import CancelAccountSurvey from 'src/screens/CancelAccount/CancelAccountSurvey/CancelAccountSurvey';
import { NavigationPropsType } from 'src/types/types';
import useCancelAccountSurvey from 'src/screens/CancelAccount/CancelAccountSurvey/hooks/useCancelAccountSurvey';
import { Provider } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { string } from 'src/screens/CancelAccount/strings/string';
import CardConfigureServices from 'src/api/CardConfigureServices';
import CardCancellationServices from 'src/api/CardCancellationServices';

jest.mock('src/api/CardConfigureServices', () => ({
  getCards: jest.fn(),
}));

jest.mock('src/api/CardCancellationServices', () => ({
  submitCardCancellation: jest.fn(),
  getCardCancellationReasons: jest.fn(),
}));

const mockRefObject = {
  current: {
    open: jest.fn(),
    close: jest.fn(),
  },
};

const store = configureStore()({ ...INITIAL_STORE_MOCK });

const ComponentRenderProps: NavigationPropsType = {
  navigation: {
    dispatch: jest.fn(),
    goBack: jest.fn(),
    navigate: jest.fn(),
    reset: jest.fn(),
  },
  route: {
    params: {},
    key: '',
    name: '',
  },
};

const getCardCancellationReasonsResolvedData = [
  {
    type: '',
    description: 'The card is not working',
  },
  {
    type: '',
    description: 'The card is not working',
  },
  {
    type: '',
    description: 'The card is not working',
  },
  {
    type: '',
    description: 'The card is not working',
  },
];

const ComponentRender = (props: NavigationPropsType) => render(<CancelAccountSurvey {...props} />);

describe('CancelAccountSurvey Screen', () => {
  it('should render CancelAccountSurvey screen', () => {
    const componentRendered = ComponentRender(ComponentRenderProps);
    expect(componentRendered).toBeTruthy();
  });

  it('should render hook correctly', () => {
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    waitFor(() => {
      expect(result.current.onOpen).toBeTruthy();
    });
  });

  it('should execute goToGenericError correctly', () => {
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.goToGenericError();
    });

    expect(ComponentRenderProps.navigation.navigate).toHaveBeenCalledWith('GenericError', {
      nextScreen: navigationScreenNames.bottomTabNavigator,
      title: string.cancelAccountWaitingErrorTitle,
      subtitle: string.cancelAccountWaitingErrorSubtitle,
      text: string.cancelAccountWaitingErrorDescription,
      buttonLabel: string.cancelAccountWaitingErrorButtonLabel,
    });
  });

  it('should execute getCardData correctly', async () => {
    const getCardsResolvedData = [
      {
        id: '1',
        account: '1',
        isMain: true,
        reference: '1',
        status: '1',
      },
      {
        id: '2',
        account: '2',
        isMain: true,
        reference: '2',
        status: '2',
      },
    ];
    CardConfigureServices.getCards.mockResolvedValueOnce(getCardsResolvedData);
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.getCardData();
    });

    expect(result.current.card).toEqual(getCardsResolvedData[0].id);
  });

  it('should execute getCardData with error', async () => {
    CardConfigureServices.getCards.mockRejectedValueOnce(new Error());
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.getCardData();
    });

    expect(result.current.card).toEqual('');
  });

  it('should execute getReasons correctly', async () => {
    CardCancellationServices.getCardCancellationReasons.mockResolvedValueOnce(
      getCardCancellationReasonsResolvedData,
    );
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.getReasons();
    });

    expect(result.current.isLoading).toEqual(true);
  });

  it('should execute getReasons with error', async () => {
    CardCancellationServices.getCardCancellationReasons.mockRejectedValueOnce(new Error());
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    await act(async () => {
      await result.current.getReasons();
    });

    expect(ComponentRenderProps.navigation.navigate).toHaveBeenCalledWith('GenericError', {
      nextScreen: navigationScreenNames.bottomTabNavigator,
      title: string.cancelAccountWaitingErrorTitle,
      subtitle: string.cancelAccountWaitingErrorSubtitle,
      text: string.cancelAccountWaitingErrorDescription,
      buttonLabel: string.cancelAccountWaitingErrorButtonLabel,
    });
  });

  it('should execute onCancelAccount correctly', async () => {
    CardCancellationServices.submitCardCancellation.mockResolvedValueOnce({
      requestTime: '',
      maskedCard: '',
      requestDate: '12/12/2023',
      pending: { type: 'overpayment' },
    });
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => result.current.setReasons(getCardCancellationReasonsResolvedData as never));

    await act(async () => {
      await result.current.onCancelAccount(3, 'The other reason');
    });

    expect(ComponentRenderProps.navigation.navigate).toHaveBeenCalled();
  });

  it('should execute onCancelAccount with error', async () => {
    CardCancellationServices.submitCardCancellation.mockRejectedValueOnce(new Error());
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => result.current.setReasons(getCardCancellationReasonsResolvedData as never));

    await act(async () => {
      await result.current.onCancelAccount(1, '');
    });

    expect(ComponentRenderProps.navigation.navigate).toHaveBeenCalled();
  });

  it('should execute onPressBackArrow correctly', () => {
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.onPressBackArrow();
    });

    expect(ComponentRenderProps.navigation.goBack).toHaveBeenCalled();
  });

  it('should execute onOpen correctly', () => {
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.onOpen(mockRefObject);
    });

    expect(mockRefObject.current.open).toHaveBeenCalled();
  });

  it('should execute onClose correctly', () => {
    const { result } = renderHook(() => useCancelAccountSurvey(ComponentRenderProps), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    act(() => {
      result.current.setIsLoading(false);
    });

    act(() => {
      result.current.onClose(mockRefObject);
    });

    expect(mockRefObject.current.close).toHaveBeenCalled();
  });
});
