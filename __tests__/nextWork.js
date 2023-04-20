import { Agent as HttpAgent } from 'node:http';
import { Agent as HttpsAgent } from 'node:http';
import { createAgentClass, getInputUrl } from '../src/nextWork.ts';

describe('Test createAgentClass', () => {
  it('should set customHarAgentEnabled to true on addRequest', () => {
    const HarHttpAgent = createAgentClass(HttpAgent);
    const harHttpAgent = new HarHttpAgent();
    expect(harHttpAgent.addRequest.customHarAgentEnabled).toBe(true);

    const HarHttpsAgent = createAgentClass(HttpsAgent);
    const harHttpsAgent = new HarHttpsAgent();
    expect(harHttpsAgent.addRequest.customHarAgentEnabled).toBe(true);
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
