import { MusicVideo } from './models';

// eslint-disable-next-line import/prefer-default-export
export const parseDuration = (durationLabel: string): number => {
  const durationList = durationLabel.split(':');
  return durationList.length === 3
    ? parseInt(durationList[0], 10) * 3600 +
        parseInt(durationList[1], 10) * 60 +
        parseInt(durationList[2], 10)
    : parseInt(durationList[0], 10) * 60 + parseInt(durationList[1], 10);
};

export const parseVideo = (content: {
  musicResponsiveListItemRenderer: {
    flexColumns: {
      musicResponsiveListItemFlexColumnRenderer: {
        text: {
          runs: {
            text: string;
            navigationEndpoint: { watchEndpoint: { videoId: string } };
          }[];
        };
      };
    }[];
    thumbnail: {
      musicThumbnailRenderer: {
        thumbnail: { thumbnails: { url: string }[] };
      };
    };
  };
}): MusicVideo => ({
  youtubeId:
    content.musicResponsiveListItemRenderer.flexColumns[0]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint
      .watchEndpoint.videoId,
  title:
    content.musicResponsiveListItemRenderer.flexColumns[0]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
  artist:
    content.musicResponsiveListItemRenderer.flexColumns[1]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
  album:
    content.musicResponsiveListItemRenderer.flexColumns[1]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text,
  thumbnailUrl: content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
    ?.url,
  duration: {
    label:
      content.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text,
    totalSeconds: parseDuration(
      content.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text
    ),
  },
});
