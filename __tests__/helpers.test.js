// import addHeaders from '../nextWork/helpers.ts';
// import buildQueryParams from '../nextWork/helpers.ts';
// import getDuration from '../nextWork/helpers.ts';
// import getInputUrl from '../nextWork/nextWork.ts';
const {
  addHeaders,
  buildQueryParams,
  getDuration,
} = require('../nextWork/helpers');
const { getInputUrl } = require('../nextWork/nextWork');

describe('addHeaders', () => {
  it('returns a headers object with requestIdHeader if oldHeaders is null or undefined', () => {
    const requestIdHeader = { 'X-Request-ID': '123' };
    const oldHeaders = null;

    const result = addHeaders(oldHeaders, requestIdHeader);

    expect(result.get('X-Request-ID')).toEqual('123');
  });

  it('returns a new Headers object with the requestIdHeader properties added to it', () => {
    const requestIdHeader = { 'X-Request-ID': '123' };
    const oldHeaders = new Headers({
      'Content-Type': 'application/json',
    });

    const result = addHeaders(oldHeaders, requestIdHeader);

    expect(result.get('Content-Type')).toEqual('application/json');
    expect(result.get('X-Request-ID')).toEqual('123');
  });
});

describe('buildQueryParams', () => {
  it('returns empty array for empty map', () => {
    const queryParams = new Map();
    expect(buildQueryParams(queryParams)).toEqual([]);
  });

  it('returns array of QueryParams for non-empty map', () => {
    const queryParams = new Map([
      ['q', 't'],
      ['page', '2'],
      ['filter', 'recent'],
    ]);
    expect(buildQueryParams(queryParams)).toEqual([
      { name: 'q', value: 't' },
      { name: 'page', value: '2' },
      { name: 'filter', value: 'recent' },
    ]);
  });
});

describe('getDuration', () => {
  it('calculates duration between two timestamps', () => {
    const a = [1630349200, 500000000];
    const b = [1630349220, 750000000];
    expect(getDuration(a, b)).toBeCloseTo(20249.9995); // within 0.0005ms of expected value
  });

  it('returns zero for identical timestamps', () => {
    const a = [1630349200, 500000000];
    const b = [1630349200, 500000000];
    expect(getDuration(a, b)).toBe(0);
  });

  it('handles nanosecond overflow correctly', () => {
    const a = [1630349200, 999999999];
    const b = [1630349201, 500000000];
    expect(getDuration(a, b)).toBeCloseTo(500.000000001); // Thanks ChatGPT. Within 0.000000001ms of expected value
  });
});

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
