import got from 'got';
import { MusicVideo } from './models';
import { parseVideo } from './parsers';
import context from './context';

export default async function search(
  query: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search',
    {
      json: {
        ...context.body(options?.lang, options?.country),
        query,
      },
      searchParams: {
        alt: 'json',
        key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
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
    const { contents } = JSON.parse(
      response.body
    ).contents.sectionListRenderer.contents[0].musicShelfRenderer;

    const results: MusicVideo[] = [];
    contents.forEach((content) => {
      try {
        results.push(parseVideo(content));
      } catch (e) {
        console.error(e);
      }
    });
    return results;
  } catch {
    return [];
  }
}
