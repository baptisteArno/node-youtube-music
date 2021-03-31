import { MusicVideo, PlaylistPreview } from './models';
export declare const parseDuration: (durationLabel: string) => number;
export declare const parseSongSearchResult: (content: {
    musicResponsiveListItemRenderer: {
        flexColumns: {
            musicResponsiveListItemFlexColumnRenderer: {
                text: {
                    runs: {
                        text: string;
                        navigationEndpoint: {
                            watchEndpoint: {
                                videoId: string;
                            };
                        };
                    }[];
                };
            };
        }[];
        thumbnail: {
            musicThumbnailRenderer: {
                thumbnail: {
                    thumbnails: {
                        url: string;
                    }[];
                };
            };
        };
    };
}) => MusicVideo | null;
export declare const parseSuggestion: (content: {
    playlistPanelVideoRenderer: {
        navigationEndpoint: {
            watchEndpoint: {
                videoId: string;
            };
        };
        title: {
            runs: {
                text: string;
            }[];
        };
        longBylineText: {
            runs: {
                text: string;
            }[];
        };
        thumbnail: {
            thumbnails: {
                url: string;
            }[];
        };
        lengthText: {
            runs: {
                text: string;
            }[];
        };
    };
}) => MusicVideo | null;
export declare const parsePlaylistsSearchResults: (content: {
    musicResponsiveListItemRenderer: {
        flexColumns: {
            musicResponsiveListItemFlexColumnRenderer: {
                text: {
                    runs: {
                        text: string;
                    }[];
                };
            };
        }[];
        thumbnail: {
            musicThumbnailRenderer: {
                thumbnail: {
                    thumbnails: {
                        url: string | undefined;
                    }[];
                };
            };
        };
        navigationEndpoint: {
            browseEndpoint: {
                browseId: string;
            };
        };
    };
}, onlyOfficialPlaylists: boolean) => PlaylistPreview | null;
export declare const parseMusicFromPlaylist: (content: {
    musicResponsiveListItemRenderer: {
        thumbnail: {
            musicThumbnailRenderer: {
                thumbnail: {
                    thumbnails: {
                        url: string;
                    }[];
                };
            };
        };
        fixedColumns: {
            musicResponsiveListItemFixedColumnRenderer: {
                text: {
                    runs: {
                        text: string;
                    }[];
                };
            };
        }[];
        flexColumns: {
            musicResponsiveListItemFlexColumnRenderer: {
                text: {
                    runs: {
                        navigationEndpoint: {
                            watchEndpoint: {
                                videoId: string;
                            };
                        };
                        text: string;
                    }[];
                };
            };
        }[];
    };
}) => MusicVideo | null;
