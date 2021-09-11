import got from 'got';
import context from './context';
import { MusicVideo } from './models';
import { parseMusicFromAlbum, parseAlbumHeader } from './parsers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseAlbum = (body:any): MusicVideo[] => {
  const { contents } = body.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicShelfRenderer
  const songs:MusicVideo[] = []
  const { thumbnailUrl, artist, album } = parseAlbumHeader(body.header)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contents.forEach((element:any)=>{
    try {
      const song = parseMusicFromAlbum(element)
      if(song){
        song.album = album;
        song.artist = artist;
        song.thumbnailUrl = thumbnailUrl;
        songs.push(song);
      }
    } catch (err) {
      console.error(err);
    }    
  })
  return songs
}

export default async function listMusicsFromAlbum(
  albumId: string,
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
        browseId: albumId,
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
    return parseAlbum(JSON.parse(response.body))
  } catch (e) {
    console.error(e);
    return [];
  }
}
