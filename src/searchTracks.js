import got from 'got';
import context from './context.js';
import parseTrackItem from './parsers/parseTrackItem.js';

export const parseSearchTracksBody = (body) => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;

  const results = [];

  contents.forEach((content) => {
    try {
      const track = parseTrackItem(content);
      if (track) {
        results.push(track);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return {
    tracks: results
  };
};

export async function searchTracks(query) {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        params: 'EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D',
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
    return parseSearchTracksBody(JSON.parse(response.body));
  } catch {
    return [];
  }
}
