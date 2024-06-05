import { string } from '../../strings/string';

describe('CardConfigure Strings', () => {
  it('should be an object', () => {
    expect(typeof string).toBe('object');
  });

  it('should have a property called activated', () => {
    expect(string).toHaveProperty('activated');
  });

  it('should have an objecto with only string values', () => {
    Object.keys(string).forEach((key) => {
      expect(typeof string[key as keyof typeof string]).toBe('string');
    });
  });
});
