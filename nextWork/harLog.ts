const {
  name: packageName,
  version: packageVersion,
} = require('../package.json');

import { Entry, HarLog, PageInfo } from './interfaces';

const createHarLog = (
  entries: Entry[] = [],
  pageInfo: PageInfo = {}
): { log: HarLog } => {
  return {
    log: {
      version: '1.2',
      creator: {
        name: packageName,
        version: packageVersion,
      },
      pages: [
        Object.assign(
          {
            startedDateTime: new Date().toISOString(),
            id: 'page_1',
            title: 'Page',
            pageTimings: {
              onContentLoad: -1,
              onLoad: -1,
            },
          },
          pageInfo
        ),
      ],
      entries,
    },
  };
};

export {};

module.exports = createHarLog;
