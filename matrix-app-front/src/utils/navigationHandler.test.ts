import { CommonActions } from '@react-navigation/native';
import { resetNavigation, resetNavigationToScreen } from './navigationHandler';

jest.useFakeTimers();

describe('Navigation Utilities Tests', () => {
  const mockNavigation = {
    dispatch: jest.fn(),
  };

  describe('resetNavigation Function', () => {
    test('calls navigation dispatch with correct parameters', () => {
      const stack = 'Home';
      const params = { userId: 1 };

      resetNavigation(mockNavigation, stack, params);
      jest.runAllTimers();

      expect(mockNavigation.dispatch).toHaveBeenCalledWith(
        CommonActions.reset({
          index: 0,
          routes: [{ name: stack, params }],
        }),
      );
    });

    test('calls navigation dispatch with empty params if none provided', () => {
      const stack = 'Home';

      resetNavigation(mockNavigation, stack);
      jest.runAllTimers();

      expect(mockNavigation.dispatch).toHaveBeenCalledWith(
        CommonActions.reset({
          index: 0,
          routes: [{ name: stack, params: {} }],
        }),
      );
    });
  });

  describe('resetNavigationToScreen Function', () => {
    test('navigates to nested stack with correct parameters', () => {
      const stack = ['Home', 'Profile'];
      const params = { userId: 1 };

      resetNavigationToScreen(mockNavigation, stack, params);
      jest.runAllTimers();

      const expectedNavigationStack = {
        name: 'Home',
        state: {
          routes: [
            {
              name: 'Profile',
              params,
            },
          ],
        },
      };

      expect(mockNavigation.dispatch).toHaveBeenCalledWith(
        CommonActions.reset({
          index: 0,
          routes: [expectedNavigationStack],
        }),
      );
    });

    test('navigates to nested stack with empty params if none provided', () => {
      const stack = ['Home', 'Profile'];

      resetNavigationToScreen(mockNavigation, stack);
      jest.runAllTimers();

      const expectedNavigationStack = {
        name: 'Home',
        state: {
          routes: [
            {
              name: 'Profile',
              params: {},
            },
          ],
        },
      };

      expect(mockNavigation.dispatch).toHaveBeenCalledWith(
        CommonActions.reset({
          index: 0,
          routes: [expectedNavigationStack],
        }),
      );
    });
  });
});
