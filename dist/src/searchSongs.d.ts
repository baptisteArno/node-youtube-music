import { MusicVideo } from './models';
export declare const parseSongsSearchBody: (body: {
    contents: {
        sectionListRenderer: {
            contents: {
                musicShelfRenderer: {
                    contents: [];
                };
            }[];
        };
    };
}) => MusicVideo[];
export default function searchSongs(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
