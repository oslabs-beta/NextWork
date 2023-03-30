const { getInputUrl } = require('../nextWork/nextWork');

describe('getInputUrl', () => {
  it('should return a URL object for a string input', () => {
    const input = 'https://www.example.com/';
    const result = getInputUrl(input);
    expect(result).toBeInstanceOf(URL);
    expect(result.toString()).toBe(input);
  });

  it('should return a URL object for an object input with a href property', () => {
    const input = { href: 'https://www.example.com/' };
    const result = getInputUrl(input);
    expect(result).toBeInstanceOf(URL);
    expect(result.toString()).toBe(input.href);
  });

  it('should throw an error for invalid input', () => {
    expect(() => getInputUrl(123)).toThrow();
    expect(() => getInputUrl({ url: 'https://www.example.com/' })).toThrow();
    expect(() => getInputUrl(null)).toThrow();
    expect(() => getInputUrl(undefined)).toThrow();
  });
});
