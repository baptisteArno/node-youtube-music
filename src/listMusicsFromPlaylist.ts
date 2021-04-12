import got from 'got';
import context from './context';
import { MusicVideo } from './models';
import { parseMusicFromPlaylist } from './parsers';

export const parsePlaylist = async (body: {
  contents: {
    singleColumnBrowseResultsRenderer: {
      tabs: {
        tabRenderer: {
          content: {
            sectionListRenderer: {
              contents: { musicPlaylistShelfRenderer: { contents: [] } }[];
            };
          };
        };
      }[];
    };
  };
}): Promise<MusicVideo[]> => {
  const {
    contents,
  } = body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicPlaylistShelfRenderer;

  const results: MusicVideo[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents.forEach((content: any) => {
    try {
      const song = parseMusicFromPlaylist(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export default async function listMusicsFromPlaylist(
  playlistId: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body(options?.lang, options?.country),
        browseId: playlistId,
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
    return parsePlaylist(JSON.parse(response.body));
  } catch (e) {
    console.error(e);
    return [];
  }
}
