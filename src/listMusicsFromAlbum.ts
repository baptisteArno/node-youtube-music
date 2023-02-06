import got from 'got';
import context from './context.js';
import { MusicVideo } from './models.js';
import { parseAlbumHeader, parseMusicInAlbumItem } from './parsers.js';

export const parseListMusicsFromAlbumBody = (body: any): MusicVideo[] => {
  const { contents } =
    body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0].musicShelfRenderer;
  const songs: MusicVideo[] = [];
  const { thumbnailUrl, artist, album } = parseAlbumHeader(body.header);

  contents.forEach((element: any) => {
    try {
      const song = parseMusicInAlbumItem(element);
      if (song) {
        song.album = album;
        if (song.artists?.length === 0) song.artists = [{ name: artist }];
        song.thumbnailUrl = thumbnailUrl;
        songs.push(song);
      }
    } catch (err) {
      console.error(err);
    }
  });
  return songs;
};

export async function listMusicsFromAlbum(
  albumId: string
): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/browse?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
    {
      json: {
        ...context.body,
        browseId: albumId,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        origin: 'https://music.youtube.com',
      },
    }
  );
  try {
    return parseListMusicsFromAlbumBody(JSON.parse(response.body));
  } catch (e) {
    console.error(e);
    return [];
  }
}
