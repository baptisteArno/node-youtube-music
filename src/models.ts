export enum AccountType {
  REGULAR = 'regular',
  VERIFIED_ARTIST = 'BADGE_STYLE_TYPE_VERIFIED_ARTIST',
}

export interface Video {
  youtubeId: string;
  title: string;
  thumbnailUrl: string;
  viewsLabel: number;
  channelName: string;
  duration: {
    label: string;
    totalSeconds: number;
  };
  accountType: AccountType;
}
