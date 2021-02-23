import { MusicVideo } from './models';
export declare const parseDuration: (durationLabel: string) => number;
export declare const parseVideo: (content: {
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
