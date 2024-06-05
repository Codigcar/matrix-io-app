import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CardDocumentDetail from 'src/screens/CardOffer/CardDocumentDetail/CardDocumentDetail';
import { testID } from '../../shared/strings/testID';

const mockStore = configureStore([]);

jest.mock('react-native-pdf', () => {
  const Pdf = () => null;

  return {
    __esModule: true,
    default: Pdf,
  };
});

jest.mock('assets/svgs', () => ({
  DownloadIcon: () => null,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('../../CardDocuments/hooks/useCardDocuments', () => ({
  __esModule: true,
  default: jest.fn(() => ({ onDownloadDocument: jest.fn() })),
  type: { OnPressViewDocument: {} },
}));

jest.mock('src/components/BackHeader', () => {
  const BackHeader = () => null;
  return {
    __esModule: true,
    default: BackHeader,
  };
});
describe('CardDocumentDetail Screen', () => {
  it('renders correctly with sharing functionality', async () => {
    const route = {
      params: {
        title: 'Test Document',
        url: 'https://example.com/document.pdf',
        showShareIcon: true,
        actionShareIcon: jest
          .fn()
          .mockResolvedValue({ url: 'https://example.com/shared-document.pdf' }),
      },
    };

    const store = mockStore({});

    const { getByTestId } = render(
      <Provider store={store}>
        <CardDocumentDetail route={route} />
      </Provider>,
    );

    fireEvent.press(getByTestId(testID.backArrowBoxId));
  });

  it('renders correctly without sharing functionality', () => {
    const route = {
      params: {
        title: 'Test Document',
        url: 'https://example.com/document.pdf',
        showShareIcon: false,
        actionShareIcon: jest.fn(),
      },
    };

    const store = mockStore({});

    const { getByTestId } = render(
      <Provider store={store}>
        <CardDocumentDetail route={route} />
      </Provider>,
    );

    fireEvent.press(getByTestId(testID.backArrowBoxId));
  });
});
