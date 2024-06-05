import { act, renderHook } from '@testing-library/react-hooks';
import { getLastStatusDelivery } from 'src/api/PhysicalCardServices';
import { useSelector } from 'react-redux';
import navigationScreenNames from 'src/utils/navigationScreenNames';
import { STATUS_DELIVERY_ORDER } from 'src/utils/constants';
import usePhysicalCardDeliveryStatus from '../../hooks/usePhysicalCardDeliveryStatus';

jest.mock('src/api/PhysicalCardServices');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('usePhysicalCardDeliveryStatus', () => {
  beforeEach(() => {
    useSelector.mockReturnValue('mockedPhysicalCardState');
  });

  it('should fetch and set delivery data when status is pendingActivation', async () => {
    const mockNavigation = { navigate: jest.fn() };
    getLastStatusDelivery.mockResolvedValueOnce([
      { status: STATUS_DELIVERY_ORDER.pendingActivation },
    ]);
    const { result, waitForNextUpdate } = renderHook(() =>
      usePhysicalCardDeliveryStatus({ navigation: mockNavigation }),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasProduct).toBe(true);
    expect(result.current.isClosed).toBe(false);
    expect(result.current.deliveryData).toEqual({
      status: STATUS_DELIVERY_ORDER.pendingActivation,
    });
  });

  it('should set isClosed when status is orderClosed and physicalCardState is not CARD_IS_STOLEN', async () => {
    const mockNavigation = { navigate: jest.fn() };
    getLastStatusDelivery.mockResolvedValueOnce([{ status: STATUS_DELIVERY_ORDER.orderClosed }]);
    const { result, waitForNextUpdate } = renderHook(() =>
      usePhysicalCardDeliveryStatus({ navigation: mockNavigation }),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasProduct).toBe(false);
    expect(result.current.isClosed).toBe(true);
    expect(result.current.deliveryData).toBe(null);
  });

  it('should handle errors', async () => {
    const mockNavigation = { navigate: jest.fn() };
    getLastStatusDelivery.mockRejectedValueOnce('Mocked error');
    const { result, waitForNextUpdate } = renderHook(() =>
      usePhysicalCardDeliveryStatus({ navigation: mockNavigation }),
    );

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasProduct).toBe(false);
    expect(result.current.isClosed).toBe(false);
    expect(result.current.deliveryData).toBe(null);
    expect(mockNavigation.navigate).toHaveBeenCalledWith(navigationScreenNames.genericError, {
      nextScreen: navigationScreenNames.bottomTabNavigator,
    });
  });

  it('should call navigate with the correct parameters when goToRequestPhysicalCard is called', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { result } = renderHook(() =>
      usePhysicalCardDeliveryStatus({ navigation: mockNavigation }),
    );

    act(() => {
      result.current.goToRequestPhysicalCard();
    });

    expect(mockNavigation.navigate).toHaveBeenCalledWith(navigationScreenNames.physicalCard.stack);
  });
});
