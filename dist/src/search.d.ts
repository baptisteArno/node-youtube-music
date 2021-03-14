import { MusicVideo } from './models';
export declare const parseYoutubeMusicSearchBody: (body: {
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
export default function search(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
