import got from 'got';
import context from './context.js';
import { parsePlaylistItem } from './parsers.js';

export const parseSearchPlaylistsBody = (
  body,
  onlyOfficialPlaylists
) => {
  const contents =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer?.contents;

  if (!contents) {
    return [];
  }


  const results = [];

  contents.forEach((content) => {
    try {
      const playlist = parsePlaylistItem(content, onlyOfficialPlaylists);
      if (playlist) {
        results.push(playlist);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function searchPlaylists(
  query,
  options
) {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        params: 'EgWKAQIoAWoKEAoQAxAEEAUQCQ%3D%3D',
        query,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        origin: 'https://music.youtube.com',
      },
    }
  );
  try {
    return parseSearchPlaylistsBody(
      JSON.parse(response.body),
      options?.onlyOfficialPlaylists ?? false
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
