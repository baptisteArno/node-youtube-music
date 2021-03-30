import { MusicVideo } from './models';
export declare const parsePlaylist: (body: {
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
}) => MusicVideo[];
export default function getPlaylist(playlistId: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
