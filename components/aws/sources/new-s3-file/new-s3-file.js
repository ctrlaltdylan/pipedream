const { methods, ...base } = require("../common/s3");

module.exports = {
  ...base,
  key: "aws-new-s3-file",
  name: "New S3 File",
  description: "Emits and event whenever a new file is added to an S3 bucket",
  version: "0.0.1",
  dedupe: "unique",
  methods: {
    ...methods,
    getEvents() {
      return [
        "s3:ObjectCreated:*",
      ];
    },
    generateMeta(data) {
      const { "x-amz-request-id": id } = data.responseElements;
      const { key } = data.s3.object;
      const { eventTime: isoTimestamp } = data;
      return {
        id,
        summary: `New file: '${key}'`,
        ts: Date.parse(isoTimestamp),
      };
    },
  },
};
