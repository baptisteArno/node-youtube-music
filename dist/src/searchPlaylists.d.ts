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
}, onlyOfficialPlaylists: boolean) => PlaylistPreview[];
export default function searchPlaylists(query: string, options?: {
    lang?: string;
    country?: string;
    onlyOfficialPlaylists?: boolean;
}): Promise<PlaylistPreview[]>;
