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
}) => Promise<MusicVideo[]>;
export default function listMusicsFromPlaylist(playlistId: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
