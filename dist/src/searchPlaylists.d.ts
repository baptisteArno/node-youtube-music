import { PlaylistPreview } from './models';
export declare const parsePlaylistsSearchBody: (body: {
    contents: {
        sectionListRenderer: {
            contents: {
                musicShelfRenderer: {
                    contents: [];
                };
            }[];
        };
    };
}) => PlaylistPreview[];
export default function searchPlaylists(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<PlaylistPreview[]>;
