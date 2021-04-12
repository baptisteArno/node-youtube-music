import searchMusics from './searchMusics';
import searchPlaylists from './searchPlaylists';
import getSuggestions from './suggestions';
import listMusicsFromPlaylist from './listMusicsFromPlaylist';
declare const _default: {
    parseMusicsSearchBody: (body: {
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
    parseSuggestionsBody: (body: {
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
    parsePlaylistsSearchBody: (body: {
        contents: {
            sectionListRenderer: {
                contents: {
                    musicShelfRenderer: {
                        contents: [];
                    };
                }[];
            };
        };
    }, onlyOfficialPlaylists: boolean) => import("./models").PlaylistPreview[];
    parsePlaylist: (body: {
        contents: {
            singleColumnBrowseResultsRenderer: {
                tabs: {
                    tabRenderer: {
                        content: {
                            sectionListRenderer: {
                                contents: {
                                    musicPlaylistShelfRenderer: {
                                        contents: [];
                                    };
                                }[];
                            };
                        };
                    };
                }[];
            };
        };
    }) => Promise<import("./models").MusicVideo[]>;
    searchMusics: typeof searchMusics;
    searchPlaylists: typeof searchPlaylists;
    getSuggestions: typeof getSuggestions;
    listMusicsFromPlaylist: typeof listMusicsFromPlaylist;
};
export default _default;
