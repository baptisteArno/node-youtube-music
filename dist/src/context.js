"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    body: (lang, country) => ({
        context: {
            capabilities: {},
            client: {
                clientName: 'WEB_REMIX',
                clientVersion: '0.1',
                hl: lang !== null && lang !== void 0 ? lang : 'en',
                gl: country !== null && country !== void 0 ? country : 'GB',
            },
        },
    }),
};
