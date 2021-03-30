import { MusicVideo } from './models';
export declare const parseMusicsSearchBody: (body: {
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
export default function searchMusics(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
