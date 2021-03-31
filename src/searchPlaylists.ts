import got from 'got';
import context from './context';
import { PlaylistPreview } from './models';
import { parsePlaylistsSearchResults } from './parsers';

export const parsePlaylistsSearchBody = (
  body: {
    contents: {
      sectionListRenderer: {
        contents: { musicShelfRenderer: { contents: [] } }[];
      };
    };
  },
  onlyOfficialPlaylists: boolean
): PlaylistPreview[] => {
  const {
    contents,
  } = body.contents.sectionListRenderer.contents[0].musicShelfRenderer;

  const results: PlaylistPreview[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents.forEach((content: any) => {
    try {
      const playlist = parsePlaylistsSearchResults(
        content,
        onlyOfficialPlaylists
      );
      if (playlist) {
        results.push(playlist);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export default async function searchPlaylists(
  query: string,
  options?: {
    lang?: string;
    country?: string;
    onlyOfficialPlaylists?: boolean;
  }
): Promise<PlaylistPreview[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body(options?.lang, options?.country),
        params: 'EgWKAQIoAWoKEAoQAxAEEAUQCQ%3D%3D',
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
    return parsePlaylistsSearchBody(
      JSON.parse(response.body),
      options?.onlyOfficialPlaylists ?? false
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
