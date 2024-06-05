import { renderHook } from '@testing-library/react-native';
import useNotificationListener from './useNotificationListener';
import { act } from 'react-test-renderer';
import { NativeEventEmitter } from 'react-native';
import { logEventAnalytics } from 'src/utils/Analytics';

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation((callback) =>
    callback({
      auth: {
        signIn: {
          cognitoUserName: 'test-user',
        },
      },
    }),
  ),
}));

jest.mock('react-native', () => {
  const originalModule = jest.requireActual('react-native');
  const mockNativeEventEmitter = {
    addListener: jest.fn(() => ({
      remove: jest.fn(),
    })),
    emit: jest.fn(),
  };

  return {
    ...originalModule,
    NativeModules: {
      PushPermissionListenerModule: jest.fn(),
    },
    NativeEventEmitter: jest.fn(() => mockNativeEventEmitter),
  };
});

jest.mock('src/utils/Analytics', () => ({
  logEventAnalytics: jest.fn(),
}));

test('status should be null at the beginning', () => {
  const { result } = renderHook(() => useNotificationListener());
  expect(result.current).toBeNull();
});

test('status should update when permission status changes', () => {
  const { result } = renderHook(() => useNotificationListener());
  const eventEmitterInstance = new NativeEventEmitter();

  act(() => {
    eventEmitterInstance.emit('PermissionStatusChanged', true);

    eventEmitterInstance.addListener('PermissionStatusChanged', function () {
      expect(result.current).toBe(true);
    });
  });
});

test('should track analytics when status changes', () => {
  const eventEmitterInstance = new NativeEventEmitter();

  act(() => {
    eventEmitterInstance.emit('PermissionStatusChanged', true);

    eventEmitterInstance.addListener('PermissionStatusChanged', function () {
      expect(logEventAnalytics).toHaveBeenCalledWith(expect.any(Object));
    });
  });
});
