const { buildRequestCookies, buildParams } = require('../nextWork/helpers.ts');

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
