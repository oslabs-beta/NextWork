const {
  buildRequestCookies,
  buildParams,
  buildHeaders,
  buildResponseCookies,
} = require('../nextWork/helpers.ts');

describe('Test buildRequestCookies', () => {
  it('should extract cookies from headers', () => {
    const headers = {
      Cookie: ['name1=value1', 'name2=value2'],
      'Other-Header': ['value'],
    };
    const expectedCookies = [
      { name: 'name1', value: 'value1' },
      { name: 'name2', value: 'value2' },
    ];
    expect(buildRequestCookies(headers)).toEqual(expectedCookies);
  });

  it('should return an empty array if no cookies are found', () => {
    const headers = {
      'Other-Header': ['value'],
    };
    expect(buildRequestCookies(headers)).toEqual([]);
  });
});

describe('Test buildParams', () => {
  it('should extract params from a query string', () => {
    const urlQuery = 'name=value&key=value1&key=value2';
    const expectedParams = [
      { key: 'name', value: 'value' },
      { key: 'key', value: 'value1' },
      { key: 'key', value: 'value2' },
    ];
    expect(buildParams(urlQuery)).toEqual(expectedParams);
  });

  it('should return an empty array if the query string is empty', () => {
    const urlQuery = '';
    expect(buildParams(urlQuery)).toEqual([]);
  });
});
// import addHeaders from '../nextWork/helpers.ts';
// import buildQueryParams from '../nextWork/helpers.ts';
// import getDuration from '../nextWork/helpers.ts';
// import getInputUrl from '../nextWork/nextWork.ts';
const {
  addHeaders,
  buildQueryParams,
  getDuration,
} = require('../nextWork/helpers');

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

describe('buildHeaders', () => {
  it('should build headers from an array', () => {
    const headers = [
      'Content-Type',
      'application/json',
      'Authorization',
      'Bearer token',
    ];
    const expected = [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'Authorization', value: 'Bearer token' },
    ];
    const result = buildHeaders(headers);
    expect(result).toEqual(expected);
  });

  it('should build headers from an object', () => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer token',
      'X-Custom-Header': ['value1', 'value2'],
    };
    const expected = [
      { name: 'Content-Type', value: 'application/json' },
      { name: 'Authorization', value: 'Bearer token' },
      { name: 'X-Custom-Header', value: 'value1' },
      { name: 'X-Custom-Header', value: 'value2' },
    ];
    const result = buildHeaders(headers);
    expect(result).toEqual(expected);
  });
});

describe('buildResponseCookies', () => {
  test("should return an empty array if 'set-cookie' header is missing", () => {
    const headers = {};
    const cookies = buildResponseCookies(headers);
    expect(cookies).toEqual([]);
  });

  test("should parse 'set-cookie' header and return an array of cookies", () => {
    const headers = {
      'set-cookie': [
        'cookie1=value1; Path=/; Domain=example.com',
        'cookie2=value2; HttpOnly; Secure',
      ],
    };
    const expectedCookies = [
      {
        name: 'cookie1',
        value: 'value1',
        path: '/',
        domain: 'example.com',
        httpOnly: false,
        secure: false,
      },
      {
        name: 'cookie2',
        value: 'value2',
        httpOnly: true,
        secure: true,
      },
    ];
    const cookies = buildResponseCookies(headers);
    expect(cookies).toEqual(expectedCookies);
  });

  test("should ignore invalid 'set-cookie' headers and continue parsing the rest", () => {
    const headers = {
      'set-cookie': ['cookie1=value1', 'invalid-cookie', 'cookie2=value2'],
    };
    const expectedCookies = [
      { name: 'cookie1', value: 'value1', httpOnly: false, secure: false },
      { name: 'cookie2', value: 'value2', httpOnly: false, secure: false },
    ];
    const cookies = buildResponseCookies(headers);
    expect(cookies).toEqual(expectedCookies);
  });

  test("should format the 'expires' property of the cookie as an ISO string", () => {
    const headers = {
      'set-cookie': ['cookie1=value1; Expires=Wed, 21 Oct 2015 07:28:00 GMT'],
    };
    const expectedCookies = [
      {
        name: 'cookie1',
        value: 'value1',
        expires: '2015-10-21T07:28:00.000Z',
        httpOnly: false,
        secure: false,
      },
    ];
    const cookies = buildResponseCookies(headers);
    expect(cookies).toEqual(expectedCookies);
  });
});
