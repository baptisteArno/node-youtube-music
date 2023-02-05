import got from 'got';
import context from './context.js';
import { Artist } from './models.js';
import { parseArtistData } from './parsers.js';

export async function getArtist(
  artistId: string,
  options?: {
    lang: string;
    country: string;
  }
): Promise<Artist> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/browse?key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        browseId: artistId,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept-Language': options?.lang ?? 'en',
        origin: 'https://music.youtube.com',
      },
    }
  );

  try {
    return parseArtistData(JSON.parse(response.body), artistId);
  } catch (e) {
    console.error(e);
    return {};
  }
}
