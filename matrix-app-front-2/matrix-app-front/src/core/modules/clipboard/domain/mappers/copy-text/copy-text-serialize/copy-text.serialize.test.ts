/* eslint-env jest */
import copyTextRequestToDto from './copy-text.serialize';

describe('copyTextRequestToDto', () => {
  it('should return valid string with valid input', () => {
    const validCopyTextSet: string = 'CODE123';

    const result: string = copyTextRequestToDto(validCopyTextSet);

    expect(result).toBe(validCopyTextSet);
  });
});
