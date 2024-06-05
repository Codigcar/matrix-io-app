import textUtils from './string';

describe('textUtils Tests', () => {
  const { textLengthAccording, capitalize } = textUtils;

  describe('textLengthAccording Function', () => {
    test('should return the full text if its length is less than the specified length', () => {
      const text = 'Hello';
      expect(textLengthAccording(text, 10)).toBe('Hello');
    });

    test('should truncate the text and append an ellipsis if its length exceeds the specified length', () => {
      const text = 'Hello World';
      expect(textLengthAccording(text, 8)).toBe('Hello W...');
    });

    test('should truncate the text and use a custom ending if provided', () => {
      const text = 'Hello World';
      expect(textLengthAccording(text, 8, '--')).toBe('Hello W--');
    });
  });

  describe('capitalize Function', () => {
    test('should capitalize the first letter of each word in a string', () => {
      const text = 'hello world';
      expect(capitalize(text)).toBe('Hello World');
    });

    test('should handle strings with multiple spaces correctly', () => {
      const text = 'hello   world';
      expect(capitalize(text)).toBe('Hello   World');
    });

    test('should handle an empty string without error', () => {
      const text = '';
      expect(capitalize(text)).toBe('');
    });
  });
});
