import { act, RenderHookResult, renderHook } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { resetNavigation } from 'src/utils/navigationHandler';
import { useDispatch } from 'react-redux';
import useUserForm from '../../hooks/useUserForm';

let mockNavigation: {
  dispatch: jest.Mock<any, any, any>;
  navigate: jest.Mock;
  goBack?: Function;
  reset?: Function;
  setOptions?: Function;
  push?: Function;
};

mockNavigation = {
  navigate: jest.fn(),
  dispatch: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
  push: jest.fn(),
};

const mockApi = {
  createDeliveryOrder: jest.fn(),
  getCalendar: jest.fn(),
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

const dispatch = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useFocusEffect: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('src/utils/Helpers', () => ({
  formatStringCamel: jest.fn((value) => value),
}));
jest.mock('src/api/PhysicalCardServices', () => ({
  createDeliveryOrder: jest.fn(),
  getCalendar: jest.fn(),
}));
jest.mock('src/utils/navigationHandler', () => ({
  resetNavigation: jest.fn(),
}));
jest.mock('src/utils/Analytics', () => ({
  logCrashlytics: jest.fn(),
}));

describe('useUserForm', () => {
  let mockProps: any;
  let hookResult: RenderHookResult<any, any>;

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatch);
    mockProps = {
      navigation: mockNavigation,
      route: {
        params: {
          address: {
            department: 'Mock Department',
            province: 'Mock Province',
            district: 'Mock District',
            address: 'Mock Address',
            label: 'Mock Label',
          },
          date: '2024-01-01',
          inning: {
            name: 'Morning',
            status: 'AVAILABLE',
            schedule: '9:00 a.m. a 12:00 p.m.',
          },
          contact: {
            phone: '+123456789',
          },
          calendarDaysList: [],
          onboarding: true,
        },
      },
    };
    hookResult = renderHook(() => useUserForm(mockProps));
  });
  it('should handle opening and closing phone modal', () => {
    act(() => {
      hookResult.result.current.openPhoneModal();
    });

    expect(hookResult.result.current.formType).toBe('phone');
    expect(hookResult.result.current.isOpen).toBe(true);

    act(() => {
      hookResult.result.current.closeModal();
    });

    expect(hookResult.result.current.isOpen).toBe(false);
  });

  it('should handle opening and closing address modal', () => {
    act(() => {
      hookResult.result.current.openAddressModal();
    });

    expect(hookResult.result.current.formType).toBe('address');
    expect(hookResult.result.current.isOpen).toBe(true);

    act(() => {
      hookResult.result.current.closeModal();
    });

    expect(hookResult.result.current.isOpen).toBe(false);
  });

  it('should navigate to home screen', async () => {
    const { result } = renderHook(() => useUserForm(mockProps));

    act(() => {
      result.current.goToHome();
    });

    expect(resetNavigation).toHaveBeenCalledWith(
      mockNavigation,
      navigationScreenNames.bottomTabNavigator,
    );
  });

  it('should navigate to edit schedule screen', () => {
    act(() => {
      hookResult.result.current.goToEditSchedule();
    });

    expect(mockProps.navigation.push).toHaveBeenCalledWith(
      navigationScreenNames.physicalCard.schedule,
      expect.objectContaining({
        contact: mockProps.route.params.contact,
        isEditing: true,
        lastAddress: mockProps.route.params.address,
        address: mockProps.route.params.address,
        calendarDaysList: mockProps.route.params.calendarDaysList,
        inningAvailable: mockProps.route.params.inning,
        dateAvailable: mockProps.route.params.date,
        lastInning: hookResult.result.current.scheduleSelected,
        onboarding: mockProps.route.params.onboarding,
      }),
    );
  });

  it('should submit phone modal', () => {
    const mockPhoneValues = { phoneNumber: '987654321' };

    act(() => {
      hookResult.result.current.submitPhoneModal(mockPhoneValues);
    });

    expect(hookResult.result.current.contactSelected.phone).toBe('+51987654321');
    expect(hookResult.result.current.isOpen).toBe(false);
  });

  it('should submit address modal', async () => {
    const mockAddressValues = {
      department: 'New Department',
      province: 'New Province',
      district: 'New District',
      addressDelivery: 'New Address',
      addressReference: 'New Reference',
    };

    await act(async () => {
      await hookResult.result.current.submitAddressModal(mockAddressValues);
    });

    expect(hookResult.result.current.isLoading).toBe(false);
  });

  it('should format the phone number using the given pattern', () => {
    const phoneNumber = '987654321';
    const phoneFormat = '### ### ###';

    const formattedNumber = hookResult.result.current.formatNumber(phoneNumber, phoneFormat);

    expect(formattedNumber).toBe('987 654 321');
  });

  it('should call navigation.goBack when goBack is invoked', () => {
    const { result } = renderHook(() => useUserForm(mockProps));
    act(() => {
      result.current.goBack();
    });
    expect(mockProps.navigation.goBack).toHaveBeenCalled();
  });

  it('should handle successful form submission', async () => {
    const mockSchedule = {
      date: '2024-01-01',
      inning: {
        name: 'Morning',
        status: 'AVAILABLE',
        schedule: '9:00 a.m. to 12:00 p.m.',
      },
      phone: '+123456789',
      location: {
        address: 'Mock Address',
        code: 'MockDistrictCode',
      },
    };

    const mockDeliveryOrderId = 'mockDeliveryOrderId';
    jest
      .spyOn(mockApi, 'createDeliveryOrder')
      .mockResolvedValueOnce({ deliveryOrderId: mockDeliveryOrderId });

    await act(async () => {
      await mockApi.createDeliveryOrder(mockSchedule);
    });

    expect(hookResult.result.current.isLoading).toBe(false);
  });

  it('should handle form submission with generic error', async () => {
    jest.spyOn(mockApi, 'createDeliveryOrder').mockRejectedValueOnce({
      response: { data: { description: 'schedule full' } },
    });

    await act(async () => {
      await hookResult.result.current.onSubmit();
    });

    expect(hookResult.result.current.isLoading).toBe(false);

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      navigationScreenNames.physicalCard.processError,
    );
  });
});
