import got from 'got';
import { MusicVideo } from './models';
import { parseSongSearchResult } from './parsers';
import context from './context';

export const parseMusicsSearchBody = (body: {
  contents: {
    sectionListRenderer: {
      contents: { musicShelfRenderer: { contents: [] } }[];
    };
  };
}): MusicVideo[] => {
  const {
    contents,
  } = body.contents.sectionListRenderer.contents[0].musicShelfRenderer;

  const results: MusicVideo[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents.forEach((content: any) => {
    try {
      const song = parseSongSearchResult(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export default async function searchMusics(
  query: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body(options?.lang, options?.country),
        params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D',
        query,
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
    return parseMusicsSearchBody(JSON.parse(response.body));
  } catch {
    return [];
  }
}
