import { act } from 'react-test-renderer';
import { renderHook } from 'jest/test-utils';
import ToastDefault from 'react-native-toast-message';

import useCardDocuments from 'src/screens/CardOffer/CardDocuments/hooks/useCardDocuments';
import { useListAccountStatementsPresenter } from '../list-account-statements.presenter';
import { useListAccountInteractor } from '../list-account-statements.interactor';

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  downloadFile: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
}));

jest.mock('../list-account-statements.interactor');
const useListAccountInteractorMock = useListAccountInteractor as jest.Mock;

const onPressViewDocumentMock = jest.fn();
jest.mock('src/screens/CardOffer/CardDocuments/hooks/useCardDocuments');
const useCardDocumentsMock = useCardDocuments as jest.Mock;
useCardDocumentsMock.mockReturnValue({
  onPressViewDocument: onPressViewDocumentMock,
});

describe('useListAccountStatementsPresenter', () => {
  test('should call onPressViewDocumentMock when success request', async () => {
    useListAccountInteractorMock.mockReturnValue({
      executeGetAccountStatementByDate: jest.fn().mockResolvedValue({
        url: 'https://www.google.com',
      }),
    });
    const { result } = renderHook(() => useListAccountStatementsPresenter());
    await act(() =>
      result.current.viewPDF({
        period: 'enero',
        title: 'enero 2023',
        id: '1',
      }));

    expect(onPressViewDocumentMock).toHaveBeenCalled();
  });

  test('should show Toast when failed request', async () => {
    useListAccountInteractorMock.mockReturnValue({
      executeGetAccountStatementByDate: jest.fn().mockRejectedValue({
        error: 'error',
      }),
    });
    const { result } = renderHook(() => useListAccountStatementsPresenter());
    await act(() =>
      result.current.viewPDF({
        period: 'enero',
        title: 'enero 2023',
        id: '1',
      }));
    const spy = jest.spyOn(ToastDefault, 'show');
    expect(spy).toHaveBeenCalledWith({
      props: { message: undefined, title: 'Ocurrió un error al cargar los estados de cuenta.' },
      type: 'error',
      visibilityTime: 4000,
    });
  });
});
