import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { SafeAreaInsetsContext, SafeAreaProvider } from 'react-native-safe-area-context';
import { string } from 'src/screens/RequestCard/shared/strings/string';
import UserFormScreen from '../../screens/UserForm';

const mockNavigation = {
  goBack: jest.fn(),
  push: jest.fn(),
};

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: ({ children }) => <>{children}</>,
}));

jest.mock('../../hooks/useUserForm', () =>
  jest.fn(() => ({
    formType: 'phone',
    closeModal: jest.fn(),
    openPhoneModal: jest.fn(),
    openAddressModal: jest.fn(),
    goToEditSchedule: jest.fn(),
    goToHome: jest.fn(),
    isOpen: false,
    submitPhoneModal: jest.fn(),
    submitAddressModal: jest.fn(),
    onSubmit: jest.fn(),
    goBack: jest.fn(),
    address: {
      department: { description: 'Dept' },
      province: { description: 'Prov' },
      district: { description: 'Dist', code: '123' },
      address: '123 Main St',
    },
    isLoading: false,
    formatNumber: jest.fn(),
    phoneFormat: '### ### ### ###',
    phoneFormatForm: '### ### ###',
    addressSelected: {
      department: { description: 'Cusco' },
      province: { description: 'Cusco' },
      district: { description: 'Cusco', code: '123' },
      address: '123 Main St',
    },
    contactSelected: { fullname: 'John Doe', phone: '123456789' },
    scheduleSelected: {
      date: '2023-01-01',
      inning: { schedule: '12:00 P.M. a 14:00 P.M.' },
    },
  })),
);

describe('UserFormScreen', () => {
  let component: any;
  beforeEach(() => {
    const params = {
      address: {
        department: { description: 'Cusco' },
        province: { description: 'Cusco' },
        district: { description: 'Cusco', code: '123' },
        address: '123 Main St',
      },
      date: '12-12-2023',
      inning: { schedule: '12:00 P.M. a 14:00 P.M.' },
      contact: { fullname: 'John Doe', phone: '123456789' },
      calendarDaysList: [],
      onboarding: true,
    };

    component = (
      <SafeAreaProvider>
        <SafeAreaInsetsContext.Provider value={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <UserFormScreen route={{ params }} navigation={mockNavigation} />
        </SafeAreaInsetsContext.Provider>
      </SafeAreaProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with valid parameters', async () => {
    const { getByText } = render(component);

    expect(getByText(string.requestCardUserFormSubtitle)).toBeDefined();
  });

  it('handles button click correctly', () => {
    const { getByText } = render(component);
    fireEvent.press(getByText(string.requestCardUserFormSubmit));
  });

  it('calls goToEditSchedule when the "Edit Schedule" link is pressed', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('editSchedule'));
  });

  it('calls openAddressModal when the "Edit" link for address is pressed', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('editAddress'));
  });

  it('calls openPhoneModal when the "Edit" link for phone is pressed', () => {
    const { getByTestId } = render(component);
    fireEvent.press(getByTestId('editContact'));
  });
});
