const { Agent: HttpAgent } = require('node:http');
const { Agent: HttpsAgent } = require('node:https');
const { createAgentClass } = require('../nextWork/nextWork.ts');

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
