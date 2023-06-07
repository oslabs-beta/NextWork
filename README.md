## NextWork: SSR Debugging Tool

NextWork is a developer tool designed to enhance the process of building web applications using server-side rendering (SSR). SSR has gained popularity due to advantages such as faster load times and easy indexation by search engines. However, it creates a gap in existing debugging tools like Chrome's network tab, making it difficult to inspect server-side requests.

Our team developed a lightweight fetch interceptor for Next.js, leveraging technologies like node-fetch-har. This solution restores the functionality of the Chrome Network Tab for server-side API calls, enabling developers to monitor and optimize their applications' performance.

### Installation

1. Install the NextWork package: `npm install next-work`

2. To include `nextWorkFetch` in your Next dev environment, run: `npm run nextWorkDev`

3. Add our Chrome Extension to complete the workflow [Extension](https://chrome.google.com/webstore/detail/nextwork-extension/kconklnlmiohlhjclohmaepphofjhblk?hl=en).

For more details and setup instructions, check out our [Website](https://next-work.dev/), [npm package](https://www.npmjs.com/package/next-work), and [Chrome extension](https://chrome.google.com/webstore/detail/nextwork-extension/kconklnlmiohlhjclohmaepphofjhblk?hl=en).
