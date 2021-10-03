export enum AccountType {
  REGULAR = 'regular',
  VERIFIED_ARTIST = 'BADGE_STYLE_TYPE_VERIFIED_ARTIST',
}

export interface MusicVideo {
  youtubeId?: string;
  title?: string;
  thumbnailUrl?: string;
  artists?: {name:string; id?:string}[];
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

export interface ArtistPreview {
  name?: string;
  artistId?: string;
  thumbnailUrl?: string;
  subscribers?: string;
}

export interface Artist {
  name?: string;
  description?: string;
  thumbnails?: any[];
  songsPlaylistId?: string;
  albums?:AlbumPreview[];
  suggestedArtists?: ArtistPreview[];
  subscribers?: string;
}

export interface PlaylistPreview {
  playlistId?: string;
  title?: string;
  thumbnailUrl?: string;
  totalSongs?: number;
}
