import waitResponsePolling, { pollCondition } from './polling';

jest.useFakeTimers();

describe('Polling Utilities Tests', () => {
  describe('waitResponsePolling Function', () => {
    test('resolves when condition is met', async () => {
      const mockRequest = jest.fn().mockResolvedValue('response');
      const conditionCallback = jest.fn().mockReturnValue(true);

      const promise = waitResponsePolling(1000, 100, mockRequest, conditionCallback);
      jest.advanceTimersByTime(100); // Advance timer to trigger the request

      await expect(promise).resolves.toBe('response');
      expect(mockRequest).toHaveBeenCalled();
      expect(conditionCallback).toHaveBeenCalledWith('response');
    });

    test('rejects on timeout', async () => {
      const mockRequest = jest.fn().mockResolvedValue('response');
      const conditionCallback = jest.fn().mockReturnValue(false);

      const promise = waitResponsePolling(1000, 100, mockRequest, conditionCallback);
      jest.advanceTimersByTime(1000); // Advance timer to trigger the timeout

      await expect(promise).rejects.toThrow('TIMEOUT_ERROR');
    });

    // Additional tests can be written for error handling and other scenarios
  });

  describe('pollCondition Function', () => {
    test('resolves when condition is met', async () => {
      const mockPromiseCall = jest.fn().mockResolvedValue('response');
      const conditionCallback = jest.fn().mockReturnValue(true);

      const promise = pollCondition(mockPromiseCall, conditionCallback, 100, 1000);
      jest.advanceTimersByTime(100); // Advance timer to trigger the request

      await expect(promise).resolves.toBe('response');
      expect(mockPromiseCall).toHaveBeenCalled();
      expect(conditionCallback).toHaveBeenCalledWith('response');
    });

    test('rejects when timeout is exceeded', async () => {
      const mockPromiseCall = jest.fn().mockResolvedValue('response');
      const conditionCallback = jest.fn().mockReturnValue(false);

      const promise = pollCondition(mockPromiseCall, conditionCallback, 100, 1000);
      jest.advanceTimersByTime(1100); // Advance timer beyond the timeout

      await expect(promise).rejects.toEqual('response');
    });

    // Additional tests for error cases and other scenarios
  });
});
