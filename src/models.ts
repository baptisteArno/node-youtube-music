export enum AccountType {
  REGULAR = 'regular',
  VERIFIED_ARTIST = 'BADGE_STYLE_TYPE_VERIFIED_ARTIST',
}

export interface MusicVideo {
  youtubeId?: string;
  title?: string;
  thumbnailUrl?: string;
  artist?: string;
  album?: string;
  isExplicit?: boolean;
  duration?: {
    label: string;
    totalSeconds: number;
  };
}

export interface AlbumPreview {
  albumId?: string;
  title?: string;
  thumbnailUrl?: string;
  artist?: string;
  artistId?: string;
  year?: string;
  isExplicit?: boolean;
}

export interface PlaylistPreview {
  playlistId?: string;
  title?: string;
  thumbnailUrl?: string;
  totalSongs?: number;
}
