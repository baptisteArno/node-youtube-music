import got from 'got';
import { MusicVideo } from './models';
import { parseSuggestion } from './parsers';
import context from './context';

export default async function getSuggestions(
  videoId: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<MusicVideo[]> {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/next',
    {
      json: {
        ...context.body(options?.lang, options?.country),
        enablePersistentPlaylistPanel: true,
        isAudioOnly: true,
        params: 'mgMDCNgE',
        playerParams: 'igMDCNgE',
        tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
        videoId,
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
    ).contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer.watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content.musicQueueRenderer.content.playlistPanelRenderer;

    console.log(contents[0]);
    const results: MusicVideo[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    contents.forEach((content: any) => {
      try {
        const video = parseSuggestion(content);
        if (video) {
          results.push(video);
        }
      } catch (e) {
        console.error(e);
      }
    });
    return results;
  } catch {
    return [];
  }
}
