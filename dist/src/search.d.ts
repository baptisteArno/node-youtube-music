import { MusicVideo } from './models';
export default function search(query: string, options?: {
    lang?: string;
    country?: string;
}): Promise<MusicVideo[]>;
