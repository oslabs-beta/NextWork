import { nextWorkFetch } from '../../nextWork/nextWork.js';

describe('integration tests tests', () => {
  it('populates HAR entry with GET Request', async () => {
    const fetch = nextWorkFetch();
    const response = await fetch(
      'https://postman-echo.com/get?foo1=bar1&foo2=bar2',
      {
        compress: false,
        headers: {
          Cookie: 'token=12345; other=abcdef',
        },
      }
    );

    expect(response.harEntry).toEqual({
      _timestamps: expect.any(Object),
      _resourceType: 'fetch',
      startedDateTime: expect.stringMatching(
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z$/
      ),
      time: expect.any(Number),
      timings: {
        blocked: expect.any(Number),
        connect: expect.any(Number),
        dns: expect.any(Number),
        receive: expect.any(Number),
        send: expect.any(Number),
        ssl: expect.any(Number),
        wait: expect.any(Number),
      },
      cache: {
        afterRequest: null,
        beforeRequest: null,
      },
      pageref: 'page_1',
      request: {
        bodySize: -1,
        cookies: [
          { name: 'token', value: '12345' },
          { name: 'other', value: 'abcdef' },
        ],
        headers: expect.arrayContaining([
          {
            name: expect.stringMatching(/^cookie$/i),
            value: 'token=12345; other=abcdef',
          },
          {
            name: 'x-har-request-id',
            value: expect.any(String),
          },
          {
            name: expect.stringMatching(/^accept$/i),
            value: '*/*',
          },
          {
            name: expect.stringMatching(/^user-agent$/i),
            value: 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
          },
        ]),
        headersSize: -1,
        httpVersion: 'HTTP/1.1',
        method: 'GET',
        queryString: [
          {
            name: 'foo1',
            value: 'bar1',
          },
          {
            name: 'foo2',
            value: 'bar2',
          },
        ],
        url: 'https://postman-echo.com/get?foo1=bar1&foo2=bar2',
      },
      response: {
        httpVersion: 'HTTP/1.1',
        status: 200,
        statusText: 'OK',
        redirectURL: '',
        headersSize: -1,
        bodySize: expect.any(Number),
        content: {
          mimeType: 'application/json; charset=utf-8',
          size: expect.any(Number),
          text: expect.any(String),
        },
        cookies: expect.any(Array),
        headers: expect.arrayContaining([
          {
            name: 'Date',
            value: expect.any(String),
          },
          {
            name: 'Content-Type',
            value: 'application/json; charset=utf-8',
          },
          {
            name: 'Content-Length',
            value: expect.any(String),
          },
          {
            name: 'Connection',
            value: 'close',
          },
          {
            name: 'ETag',
            value: expect.any(String),
          },
        ]),
      },
    });
  });

  it('populates HAR entry with POST Request and payload of application/json', async () => {
    const payload = {
      firstName: 'John',
      lastName: 'Thomas',
    };

    const fetch = nextWorkFetch();
    const response = await fetch('https://postman-echo.com/post', {
      method: 'POST',
      compress: false,
      headers: {
        Cookie: 'token=12345; other=abcdef',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    expect(response.harEntry).toEqual({
      _timestamps: expect.any(Object),
      _resourceType: 'fetch',
      startedDateTime: expect.stringMatching(
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z$/
      ),
      time: expect.any(Number),
      timings: {
        blocked: expect.any(Number),
        connect: expect.any(Number),
        dns: expect.any(Number),
        receive: expect.any(Number),
        send: expect.any(Number),
        ssl: expect.any(Number),
        wait: expect.any(Number),
      },
      cache: {
        afterRequest: null,
        beforeRequest: null,
      },
      pageref: 'page_1',
      request: {
        bodySize: expect.any(Number),
        cookies: [
          { name: 'token', value: '12345' },
          { name: 'other', value: 'abcdef' },
        ],
        headers: expect.arrayContaining([
          {
            name: expect.stringMatching(/^cookie$/i),
            value: 'token=12345; other=abcdef',
          },
          {
            name: 'x-har-request-id',
            value: expect.any(String),
          },
          {
            name: expect.stringMatching(/^accept$/i),
            value: '*/*',
          },
          {
            name: expect.stringMatching(/^user-agent$/i),
            value: 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
          },
        ]),
        headersSize: -1,
        httpVersion: 'HTTP/1.1',
        method: 'POST',
        queryString: [],
        url: 'https://postman-echo.com/post',
        postData: {
          mimeType: 'application/json',
          text: expect.stringMatching(
            /{"firstName":"John","lastName":"Thomas"}/i
          ),
        },
      },
      response: {
        httpVersion: 'HTTP/1.1',
        status: 200,
        statusText: 'OK',
        redirectURL: '',
        headersSize: -1,
        bodySize: expect.any(Number),
        content: {
          mimeType: 'application/json; charset=utf-8',
          size: expect.any(Number),
          text: expect.any(String),
        },
        cookies: expect.any(Array),
        headers: expect.arrayContaining([
          {
            name: 'Date',
            value: expect.any(String),
          },
          {
            name: 'Content-Length',
            value: expect.any(String),
          },
          {
            name: 'Connection',
            value: 'close',
          },
        ]),
      },
    });
  });

  it('populates HAR entry with POST Request and payload of application/x-www-form-urlencoded', async () => {
    const formData = 'name=John&email=john%40example.com&phone=1234567890';

    const fetch = nextWorkFetch();
    const response = await fetch('https://postman-echo.com/post', {
      method: 'POST',
      compress: false,
      headers: {
        Cookie: 'token=12345; other=abcdef',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    expect(response.harEntry).toEqual({
      _timestamps: expect.any(Object),
      _resourceType: 'fetch',
      startedDateTime: expect.stringMatching(
        /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d+Z$/
      ),
      time: expect.any(Number),
      timings: {
        blocked: expect.any(Number),
        connect: expect.any(Number),
        dns: expect.any(Number),
        receive: expect.any(Number),
        send: expect.any(Number),
        ssl: expect.any(Number),
        wait: expect.any(Number),
      },
      cache: {
        afterRequest: null,
        beforeRequest: null,
      },
      pageref: 'page_1',
      request: {
        bodySize: expect.any(Number),
        cookies: [
          { name: 'token', value: '12345' },
          { name: 'other', value: 'abcdef' },
        ],
        headers: expect.arrayContaining([
          {
            name: expect.stringMatching(/^cookie$/i),
            value: 'token=12345; other=abcdef',
          },
          {
            name: 'x-har-request-id',
            value: expect.any(String),
          },
          {
            name: expect.stringMatching(/^accept$/i),
            value: '*/*',
          },
          {
            name: expect.stringMatching(/^user-agent$/i),
            value: 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
          },
        ]),
        headersSize: -1,
        httpVersion: 'HTTP/1.1',
        method: 'POST',
        queryString: [],
        url: 'https://postman-echo.com/post',
        postData: {
          mimeType: 'application/x-www-form-urlencoded',
          params: [
            {
              name: 'email',
              value: 'john@example.com',
            },
            {
              name: 'name',
              value: 'John',
            },
            {
              name: 'phone',
              value: '1234567890',
            },
          ],
        },
      },
      response: {
        httpVersion: 'HTTP/1.1',
        status: 200,
        statusText: 'OK',
        redirectURL: '',
        headersSize: -1,
        bodySize: expect.any(Number),
        content: {
          mimeType: 'application/json; charset=utf-8',
          size: expect.any(Number),
          text: expect.any(String),
        },
        cookies: expect.any(Array),
        headers: expect.arrayContaining([
          {
            name: 'Date',
            value: expect.any(String),
          },
          {
            name: 'Content-Length',
            value: expect.any(String),
          },
          {
            name: 'Connection',
            value: 'close',
          },
        ]),
      },
    });
  });
});
