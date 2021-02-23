import { MusicVideo } from './models';
export default function getSuggestions(videoId: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
