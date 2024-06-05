/* eslint-disable global-require */
import { renderHook, act } from '@testing-library/react-hooks';
import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';
import useCardDocuments from '../../CardDocuments/hooks/useCardDocuments';

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
  logVirtualEventAnalytics: jest.fn(),
}));

jest.mock('src/utils/filesystem/download', () => ({
  downloadFromUrl: jest.fn(() => 'localFileUrl'),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('src/utils/navigationScreenNames', () => ({
  cardDocumentDetail: 'CardDocumentDetailScreen',
}));

useNavigation.mockReturnValue({
  dispatch: jest.fn(),
  goBack: jest.fn(),
  navigate: jest.fn(),
});

jest.mock('axios');
describe('useCardDocuments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should handle onDownloadDocument correctly', async () => {
    const mockTitle = 'Document Title';
    const mockUrl = 'https://example.com/document.pdf';

    Share.open.mockImplementationOnce(async (options) => {
      expect(options).toEqual({
        title: mockTitle,
        failOnCancel: false,
        saveToFiles: false,
        urls: ['file://localFileUrl'],
        type: 'application/pdf',
      });

      return Promise.resolve({});
    });

    const { result, waitForNextUpdate } = renderHook(() => useCardDocuments());

    act(() => {
      result.current.onDownloadDocument(mockTitle, mockUrl);
    });

    await waitForNextUpdate();
  });

  it('should handle onDownloadDocument error and log it', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCardDocuments());

    const mockTitle = 'Document Title';
    const mockUrl = 'http://example.com/document.pdf';

    jest
      .spyOn(require('src/utils/filesystem/download'), 'downloadFromUrl')
      .mockRejectedValueOnce(new Error('Download Error'));

    act(() => {
      result.current.onDownloadDocument(mockTitle, mockUrl);
    });

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(Share.open).not.toHaveBeenCalled();
    expect(require('src/utils/Analytics').logCrashlytics).toHaveBeenCalledWith({
      scope: 'API',
      fileName: 'CardDocuments/hooks/useCardDocuments.tsx',
      service: mockTitle,
      error: expect.any(Error),
    });
  });

  it('should handle onPressViewDocument correctly', () => {
    const { result } = renderHook(() => useCardDocuments());

    const mockViewDocumentProps = {
      title: 'Document Title',
      url: 'http://example.com/document.pdf',
      showShareIcon: true,
      actionShareIcon: jest.fn(),
    };

    act(() => {
      result.current.onPressViewDocument(mockViewDocumentProps);
    });

    expect(require('src/utils/Analytics').logVirtualEventAnalytics).toHaveBeenCalledWith({
      tipoEvento: 'Click',
      tipoElemento: 'Boton',
      valor: mockViewDocumentProps.title,
    });

    expect(useNavigation().navigate).toHaveBeenCalledWith(
      'CardDocumentDetailScreen',
      mockViewDocumentProps,
    );
  });

  it('should handle onPressBackArrow correctly', () => {
    const { result } = renderHook(() => useCardDocuments());

    act(() => {
      result.current.onPressBackArrow();
    });

    expect(useNavigation().goBack).toHaveBeenCalled();
  });
});
