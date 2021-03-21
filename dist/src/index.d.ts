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
    parseYoutubeMusicSuggestionsBody: (body: {
        contents: {
            singleColumnMusicWatchNextResultsRenderer: {
                tabbedRenderer: {
                    watchNextTabbedResultsRenderer: {
                        tabs: {
                            tabRenderer: {
                                content: {
                                    musicQueueRenderer: {
                                        content: {
                                            playlistPanelRenderer: {
                                                contents: [];
                                            };
                                        };
                                    };
                                };
                            };
                        }[];
                    };
                };
            };
        };
    }) => import("./models").MusicVideo[];
    search: typeof search;
    getSuggestions: typeof getSuggestions;
};
export default _default;
