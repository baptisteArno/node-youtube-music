import got from 'got';
import context from './context.js';
import parseSuggestionItem from './parsers/parseSuggestionItem.js';


export const parseGetSuggestionsBody = (body) => {
  const { contents } =
    body.contents.singleColumnMusicWatchNextResultsRenderer.tabbedRenderer
      .watchNextTabbedResultsRenderer.tabs[0].tabRenderer.content
      .musicQueueRenderer.content.playlistPanelRenderer;

  const results = [];

  contents.forEach((content) => {
    try {
      const video = parseSuggestionItem(content);
      if (video) {
        results.push(video);
      }
    } catch (e) {
      console.error(e);
    }
  });
  return results;
};

export async function getSuggestions(videoId) {
  const response = await got.post(
    'https://music.youtube.com/youtubei/v1/next',
    {
      json: {
        ...context.body,
        enablePersistentPlaylistPanel: true,
        isAudioOnly: true,
        params: 'mgMDCNgE',
        playerParams: 'igMDCNgE',
        tunerSettingValue: 'AUTOMIX_SETTING_NORMAL',
        playlistId: `RDAMVM${videoId}`,
        videoId,
      },
      searchParams: {
        alt: 'json',
        key: 'AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30',
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        origin: 'https://music.youtube.com',
      },
    }
  );
  try {
    return parseGetSuggestionsBody(JSON.parse(response.body));
  } catch {
    return [];
  }
}
