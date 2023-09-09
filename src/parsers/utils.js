import { AlbumType, PageType } from '../constants.js';

export const parseDuration = (durationLabel) => {
    const durationList = durationLabel.split(':');
    return durationList.length === 3
        ? parseInt(durationList[0], 10) * 3600 +
        parseInt(durationList[1], 10) * 60 +
        parseInt(durationList[2], 10)
        : parseInt(durationList[0], 10) * 60 + parseInt(durationList[1], 10);
};

export const getAlbumType = (typeText) => {
    switch (typeText) {
        case AlbumType.album:
            return AlbumType.album;
        case AlbumType.ep:
            return AlbumType.ep;
        default:
            return AlbumType.single;
    }
};

// Detects multiple artists of the MusicVideo
export const listArtists = (data) => {
    const artists = [];
    data.forEach((item) => {
      if (
        item.navigationEndpoint &&
        item.navigationEndpoint.browseEndpoint
          .browseEndpointContextSupportedConfigs.browseEndpointContextMusicConfig
          .pageType === PageType.artist
      ) {
        artists.push({
          name: item.text,
          artistId: item.navigationEndpoint.browseEndpoint.browseId,
        });
      }
    });
    if (artists.length === 0) {
      const delimiterIndex = data.findIndex((item) => item.text === ' • ');
      if (delimiterIndex !== -1) {
        data
          .filter((item, index) => index < delimiterIndex && item.name !== ' & ')
          .forEach((item) => artists.push({ name: item.text }));
      }
    }
    return artists;
  };