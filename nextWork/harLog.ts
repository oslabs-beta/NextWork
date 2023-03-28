const {
  name: packageName,
  version: packageVersion,
} = require("../package.json");

const createHarLog = (entries = [], pageInfo = {}) => {
  return {
    log: {
      version: "1.2",
      creator: {
        name: packageName,
        version: packageVersion,
      },
      pages: [
        Object.assign(
          {
            startedDateTime: new Date().toISOString(),
            id: "page_1",
            title: "Page",
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

module.exports = createHarLog;
