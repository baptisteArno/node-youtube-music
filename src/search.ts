import got from 'got';
import { Video, AccountType } from './models';

const parseDuration = (
  durationLabel: string | undefined
): number | undefined => {
  if (!durationLabel) return undefined;
  const durationList = durationLabel.split(':');
  return durationList.length === 3
    ? parseInt(durationList[0], 10) * 3600 +
        parseInt(durationList[1], 10) * 60 +
        parseInt(durationList[2], 10)
    : parseInt(durationList[0], 10) * 60 + parseInt(durationList[1], 10);
};

export default async function search(
  query: string,
  options?: {
    lang?: string;
    country?: string;
  }
): Promise<Video[]> {
  const response = await got('https://www.youtube.com/results', {
    searchParams: {
      q: encodeURIComponent(query),
      gl: options?.country ?? 'GB',
      page: 1,
    },
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      'Accept-Language': options?.country ?? 'en',
    },
  });
  const results: Video[] = [];
  const sectionLists = JSON.parse(
    /ytInitialData = ([^>]+);<\/script>/gm.exec(response.body)[1]
  ).contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer
    .contents;

  sectionLists.forEach((sectionList) => {
    if (sectionList.itemSectionRenderer) {
      sectionList.itemSectionRenderer.contents.forEach((content) => {
        try {
          if (content.videoRenderer) {
            let accountType: string;
            try {
              accountType =
                content.videoRenderer.ownerBadges[0].metadataBadgeRenderer
                  .style;
            } catch {
              accountType = 'regular';
            }
            results.push({
              youtubeId: content.videoRenderer.videoId,
              title: content.videoRenderer.title.runs[0].text,
              thumbnailUrl: content.videoRenderer.thumbnail.thumbnails.pop()
                .url,
              viewsLabel: content.videoRenderer.viewCountText?.simpleText,
              channelName: content.videoRenderer.ownerText?.runs[0].text,
              duration: {
                label: content.videoRenderer.lengthText?.simpleText,
                totalSeconds: parseDuration(
                  content.videoRenderer.lengthText?.simpleText
                ),
              },
              accountType: accountType as AccountType,
            });
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  });
  return results;
}
