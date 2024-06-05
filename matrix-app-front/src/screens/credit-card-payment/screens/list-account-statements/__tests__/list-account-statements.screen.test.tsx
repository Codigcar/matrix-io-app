import React from 'react';
import { fireEvent, render } from 'jest/test-utils';
import { ThemeProvider } from '@shopify/restyle';

import { rebrandingTheme } from 'matrix-ui-components';
import { ListAccountStatements } from '../list-account-statements.screen';
import { useListAccountStatementsPresenter } from '../list-account-statements.presenter';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useRoute: () => ({
      params: [
        {
          period: 'enero',
          title: 'enero 2023',
          id: 1,
        },
        {
          period: 'febrero',
          title: 'febrero 2023',
          id: 2,
        },
      ],
    }),
  };
});

jest.mock('react-native-share', () => ({
  open: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  downloadFile: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
}));

const viewPDFMock = jest.fn();
jest.mock('../list-account-statements.presenter');
const mockHook = useListAccountStatementsPresenter as jest.Mock;
mockHook.mockReturnValue({
  viewPDF: viewPDFMock,
  isLoading: false,
});

describe('ListAccountStatements', () => {
  test('should render correctly ', async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <ListAccountStatements />
      </ThemeProvider>,
    );
    const ListAccount = getByTestId('list-account-statements');
    expect(ListAccount).toBeDefined();
  });

  test('should call viewPDF function when press period', () => {
    const { getByText } = render(
      <ThemeProvider theme={rebrandingTheme}>
        <ListAccountStatements />
      </ThemeProvider>,
    );

    const period = getByText('enero');
    fireEvent.press(period);
    expect(viewPDFMock).toBeCalled();
  });
});
