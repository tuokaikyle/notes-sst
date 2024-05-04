import { ApiHandler } from 'sst/node/api';

export const handler = ApiHandler(async (_evt) => {
  return {
    statusCode: 200,
    body: `Hi, 世界. The time is ${new Date().toISOString()}`,
  };
});
