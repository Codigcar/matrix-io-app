import { shortenText } from '../shortenText';

describe('shortenText', () => {
  it('should return the original text if its length is less than or equal to the limit', () => {
    const text = 'Test';
    const limit = 4;
    const result = shortenText(text, limit);
    expect(result).toBe(text);
  });

  it('should return text truncated with "..." if its length exceeds the limit', () => {
    const text = 'Este es un texto largo';
    const limit = 10;
    const expectedText = 'Este es un...';
    const result = shortenText(text, limit);
    expect(result).toBe(expectedText);
  });

  it('should handle the zero limit correctly', () => {
    const text = 'Texto';
    const limit = 0;
    const expectedText = '...';
    const result = shortenText(text, limit);
    expect(result).toBe(expectedText);
  });

  it('should handle empty strings correctly', () => {
    const text = '';
    const limit = 5;
    const result = shortenText(text, limit);
    expect(result).toBe(text);
  });
});
