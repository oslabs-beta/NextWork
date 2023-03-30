const {
  name: packageName,
  version: packageVersion,
} = require('../package.json');

import {
  HarLogEntry,
  HarLog,
  PageInfo,
} from './interfaces';

const createHarLog = (
  entries: HarLogEntry[] = [],
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

// const createHarLog = (entries = [], pageInfo = {}) => {
//   return {
//     log: {
//       version: "1.2",
//       creator: {
//         name: packageName,
//         version: packageVersion,
//       },
//       pages: [
//         Object.assign(
//           {
//             startedDateTime: new Date().toISOString(),
//             id: "page_1",
//             title: "Page",
//             pageTimings: {
//               onContentLoad: -1,
//               onLoad: -1,
//             },
//           },
//           pageInfo
//         ),
//       ],
//       entries,
//     },
//   };
// };

export {};
module.exports = createHarLog;
