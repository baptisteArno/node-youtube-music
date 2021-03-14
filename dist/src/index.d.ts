import search from './search';
import getSuggestions from './suggestions';
declare const _default: {
    parseYoutubeMusicSearchBody: (body: {
        contents: {
            sectionListRenderer: {
                contents: {
                    musicShelfRenderer: {
                        contents: [];
                    };
                }[];
            };
        };
    }) => import("./models").MusicVideo[];
    search: typeof search;
    getSuggestions: typeof getSuggestions;
};
export default _default;
