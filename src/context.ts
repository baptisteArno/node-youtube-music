export default {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  body: (lang?: string, country?: string) => ({
    context: {
      capabilities: {},
      client: {
        clientName: 'WEB_REMIX',
        clientVersion: '0.1',
        hl: lang ?? 'en',
        gl: country ?? 'GB',
      },
    },
  }),
};
