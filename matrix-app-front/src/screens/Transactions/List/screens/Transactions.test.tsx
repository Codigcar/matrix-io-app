import { checkNumberOfFilters } from "../helper/checkFilters";

describe('checkNumberOfFilters', () => {
  it('should return 1 when there is one filter', () => {
    const result = checkNumberOfFilters([{}]);
    expect(result).toBe(1);
  });

  it('should return 2 when there are two filters', () => {
    const result = checkNumberOfFilters([{}, {}]);
    expect(result).toBe(2);
  });

  it('should return 3 when there are three filters', () => {
    const result = checkNumberOfFilters([{}, {}, {}]);
    expect(result).toBe(3);
  });

  it('should return -1 when there are neither one, two, nor three filters', () => {
    const result = checkNumberOfFilters([]);
    expect(result).toBe(-1);
  });

  it('should return -1 when there are more than three filters', () => {
    const result = checkNumberOfFilters([{}, {}, {}, {}]);
    expect(result).toBe(-1);
  });
});