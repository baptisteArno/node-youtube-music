import got from 'got';
import context from './context.js';
import parseArtistSearchResult from './parsers/parseArtistSearchResult.js';

export const parseArtistsSearchBody = (body) => {
  const { contents } =
    body.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.pop()
      .musicShelfRenderer;
  const results = [];

  contents.forEach((content) => {
    try {
      const artist = parseArtistSearchResult(content);
      if (artist) {
        results.push(artist);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return results;
};

export async function searchArtists(
  query,
  options
) {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        params: 'EgWKAQIgAWoKEAMQBBAJEAoQBQ%3D%3D',
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
    return parseArtistsSearchBody(JSON.parse(response.body));
  } catch (e) {
    console.error(e);
    return [];
  }
}
