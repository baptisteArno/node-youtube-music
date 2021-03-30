import { MusicVideo } from './models';
export declare const parseSuggestionsBody: (body: {
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
}) => MusicVideo[];
export default function getSuggestions(videoId: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
