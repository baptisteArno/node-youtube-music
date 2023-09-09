import got from 'got';
import context from './context.js';
import parseMusicInPlaylistItem from './parsers/parseMusicInPlaylistItem.js';


export const parseGetPlaylistTracksBody = (body) => {
  const content =
    body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0];
  const { contents } =
    content.musicPlaylistShelfRenderer ?? content.musicCarouselShelfRenderer;

  const results = [];

  contents.forEach((content) => {
    try {
      const song = parseMusicInPlaylistItem(content);
      if (song) {
        results.push(song);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function getPlaylistTracks(
  playlistId
) {
  let browseId;

  if (!playlistId.startsWith('VL')) {
    browseId = 'VL' + playlistId;
  }

  try {
    const response = await got.post(
      'https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
      {
        json: {
          ...context.body,
          browseId,
        },
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          origin: 'https://music.youtube.com',
        },
      }
    );
    return parseGetPlaylistTracksBody(JSON.parse(response.body));
  } catch (error) {
    console.error(`Error in getPlaylistTracks: ${error}`);
    return [];
  }
}
