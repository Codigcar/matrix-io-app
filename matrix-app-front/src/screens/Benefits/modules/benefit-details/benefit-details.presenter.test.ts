import { renderHook } from '@testing-library/react-hooks';
import useBenefitData from 'src/screens/Benefits/modules/benefit-details/benefit-details.presenter';

describe('useBenefitData', () => {
  it('should initializes with default states and updates the states after getting benefits', async () => {
    const route = { params: { id: '123' } };
    const { result, waitForNextUpdate } = renderHook(() => useBenefitData({ route }));
    expect(result.current.loading).toBe(false);
    expect(result.current.benefit).toBeUndefined();
    await waitForNextUpdate();
    expect(result.current.benefit).toBeDefined();
  });
});
