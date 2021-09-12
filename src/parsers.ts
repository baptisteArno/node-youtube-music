import { MusicVideo, PlaylistPreview, AlbumPreview } from './models';

// eslint-disable-next-line import/prefer-default-export
export const parseDuration = (durationLabel: string): number => {
  const durationList = durationLabel.split(':');
  return durationList.length === 3
    ? parseInt(durationList[0], 10) * 3600 +
        parseInt(durationList[1], 10) * 60 +
        parseInt(durationList[2], 10)
    : parseInt(durationList[0], 10) * 60 + parseInt(durationList[1], 10);
};

export const parseSongSearchResult = (content: {
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
    badges: {
      musicInlineBadgeRenderer:{
        icon:{
          iconType: string;
        }
      }
    }[]
  };
}): MusicVideo | null => {
  let youtubeId;
  try {
    youtubeId =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
        .navigationEndpoint.watchEndpoint.videoId;
  } catch (err) {
    console.log("Couldn't parse youtube id", err);
  }

  let title;
  try {
    title =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse title", err);
  }

  let artist;
  try {
    artist =
      content.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse artist", err);
  }

  let album;
  try {
    album =
      content.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text;
  } catch (err) {
    console.log("Couldn't parse album", err);
  }

  let thumbnailUrl;
  try {
    thumbnailUrl = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
      ?.url;
  } catch (err) {
    console.log("Couldn't parse thumbnailUrl", err);
  }

  let duration;
  try {
    duration = {
      label:
        content.musicResponsiveListItemRenderer.flexColumns[1]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text,
      totalSeconds: parseDuration(
        content.musicResponsiveListItemRenderer.flexColumns[1]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text
      ),
    };
  } catch (err) {
    console.log("Couldn't parse duration", err);
  }
  let isExplicit;
  try {
    isExplicit = content.musicResponsiveListItemRenderer.badges[0].musicInlineBadgeRenderer.icon.iconType === "MUSIC_EXPLICIT_BADGE"
  }catch (err) {
    isExplicit = false
  }
  return {
    youtubeId,
    title,
    artist,
    album,
    thumbnailUrl,
    duration,
    isExplicit,
  };
};

export const parseSuggestion = (content: {
  playlistPanelVideoRenderer: {
    navigationEndpoint: { watchEndpoint: { videoId: string } };
    title: { runs: { text: string }[] };
    longBylineText: { runs: { text: string }[] };
    thumbnail: { thumbnails: { url: string }[] };
    lengthText: { runs: { text: string }[] };
  };
}): MusicVideo | null => {
  let youtubeId;
  try {
    youtubeId =
      content.playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint
        .videoId;
  } catch (err) {
    console.log("Couldn't parse youtube id", err);
  }

  let title;
  try {
    title = content.playlistPanelVideoRenderer.title.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse title", err);
  }

  let artist;
  try {
    artist = content.playlistPanelVideoRenderer.longBylineText.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse artist", err);
  }

  let album;
  try {
    album = content.playlistPanelVideoRenderer.longBylineText.runs[2].text;
  } catch (err) {
    console.log("Couldn't parse album", err);
  }

  let thumbnailUrl;
  try {
    thumbnailUrl = content.playlistPanelVideoRenderer.thumbnail.thumbnails.pop()
      ?.url;
  } catch (err) {
    console.log("Couldn't parse thumbnailUrl", err);
  }

  let duration;
  try {
    duration = {
      label: content.playlistPanelVideoRenderer.lengthText.runs[0].text,
      totalSeconds: parseDuration(
        content.playlistPanelVideoRenderer.lengthText.runs[0].text
      ),
    };
  } catch (err) {
    console.log("Couldn't parse duration", err);
  }
  return {
    youtubeId,
    title,
    artist,
    album,
    thumbnailUrl,
    duration,
  };
};

export const parsePlaylistsSearchResults = (
  content: {
    musicResponsiveListItemRenderer: {
      flexColumns: {
        musicResponsiveListItemFlexColumnRenderer: {
          text: { runs: { text: string }[] };
        };
      }[];
      thumbnail: {
        musicThumbnailRenderer: {
          thumbnail: { thumbnails: { url: string | undefined }[] };
        };
      };
      navigationEndpoint: { browseEndpoint: { browseId: string } };
    };
  },
  onlyOfficialPlaylists: boolean
): PlaylistPreview | null => {
  let playlistId;
  try {
    playlistId =
      content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
        .browseId;
  } catch (err) {
    console.log("Couldn't parse youtube id", err);
  }
  if (
    onlyOfficialPlaylists &&
    content.musicResponsiveListItemRenderer.flexColumns[1]
      .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text !==
      'YouTube Music'
  ) {
    return null;
  }

  let title;
  try {
    title =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse title", err);
  }

  let totalSongs;
  try {
    totalSongs = parseInt(
      content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].text.split(
        ' '
      )[0],
      10
    );
  } catch (err) {
    console.log("Couldn't parse artist", err);
  }

  let thumbnailUrl;
  try {
    thumbnailUrl = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
      ?.url;
  } catch (err) {
    console.log("Couldn't parse thumbnailUrl", err);
  }

  return {
    playlistId,
    title,
    totalSongs,
    thumbnailUrl,
  };
};

export const parseMusicFromPlaylist = (content: {
  musicResponsiveListItemRenderer: {
    thumbnail: {
      musicThumbnailRenderer: {
        thumbnail: {
          thumbnails: { url: string }[];
        };
      };
    };
    fixedColumns: {
      musicResponsiveListItemFixedColumnRenderer: {
        text: { runs: { text: string }[] };
      };
    }[];
    flexColumns: {
      musicResponsiveListItemFlexColumnRenderer: {
        text: {
          runs: {
            navigationEndpoint: { watchEndpoint: { videoId: string } };
            text: string;
          }[];
        };
      };
    }[];
    badges: {
      musicInlineBadgeRenderer:{
        icon:{
          iconType: string;
        }
      }
    }[];
  };
}): MusicVideo | null => {
  let youtubeId;
  try {
    youtubeId =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
        .navigationEndpoint.watchEndpoint.videoId;
  } catch (err) {
    console.log("Couldn't parse youtube id", err);
  }

  let title;
  try {
    title =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse title", err);
  }

  let artist;
  try {
    artist =
      content.musicResponsiveListItemRenderer.flexColumns[1]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse artist", err);
  }

  let album;
  try {
    album =
      content.musicResponsiveListItemRenderer.flexColumns[2]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse album", err);
  }

  let thumbnailUrl;
  try {
    thumbnailUrl = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
      ?.url;
  } catch (err) {
    console.log("Couldn't parse thumbnailUrl", err);
  }

  let duration;
  try {
    duration = {
      label:
        content.musicResponsiveListItemRenderer.fixedColumns[0]
          .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text,
      totalSeconds: parseDuration(
        content.musicResponsiveListItemRenderer.fixedColumns[0]
          .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text
      ),
    };
  } catch (err) {
    console.log("Couldn't parse duration", err);
  }

  let isExplicit;
  try {
    isExplicit = content.musicResponsiveListItemRenderer?.badges[0].musicInlineBadgeRenderer.icon.iconType === "MUSIC_EXPLICIT_BADGE"
  } catch (err) {
    isExplicit = false
  }
  return {
    youtubeId,
    title,
    artist,
    album,
    thumbnailUrl,
    duration,
    isExplicit,
  };
};

export const parseAlbumSearchResult = (content:{
  musicResponsiveListItemRenderer: {
    thumbnail: {
      musicThumbnailRenderer: {
        thumbnail: {
          thumbnails: { url: string }[];
        };
      };
    };
    flexColumns: {
      musicResponsiveListItemFlexColumnRenderer: {
        text: {
          runs: {
            text: string;
            navigationEndpoint? :{
              browseEndpoint:{
                browseId:string
              }
            }
          }[];
        };
      };
    }[];
    navigationEndpoint: {
      browseEndpoint:{
        browseId: string;
      }
    };
    badges: {
      musicInlineBadgeRenderer:{
        icon:{
          iconType: string;
        }
      }
    }[]
  };
}): AlbumPreview | null =>{

  let albumId;
  try {
    albumId = content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint.browseId
  }
  catch(err){
    console.error("Couldn't parse albumId", err)
  }

  let title;
  try {
    title = content.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text
  }
  catch(err){
    console.error("Couldn't parse title", err)
  }

  let thumbnailUrl;
  try {
    thumbnailUrl = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()?.url
  }
  catch(err){
    console.error("Couldn't parse thumbnailUrl", err)
  }

  let artist;
  try {
    artist = content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].text
  }
  catch(err){
    console.error("Couldn't parse artist", err)
  }

  let artistId;
  try {
    artistId = content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].navigationEndpoint?.browseEndpoint.browseId
  }
  catch(err){
    console.error("Couldn't parse artistId", err)
  }

  let year;
  try{
    year = content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[4].text
  }
  catch(err){
    console.error("Couldn't parse year", err)
  }

  let isExplicit;
  try{
    isExplicit = content.musicResponsiveListItemRenderer?.badges[0].musicInlineBadgeRenderer.icon.iconType === "MUSIC_EXPLICIT_BADGE"
  }
  catch(err){
    isExplicit = false
  }
  return{
    albumId,
    title,
    thumbnailUrl,
    artist,
    artistId,
    year,
    isExplicit
  }
}


export const parseAlbumHeader = (content:{
  musicDetailHeaderRenderer:{
    title:{
      runs:{
        text:string;
      }[];
    };
    subtitle:{
      runs:{
        text:string;
      }[]
    };
    thumbnail:{
      croppedSquareThumbnailRenderer:{
        thumbnail:{
          thumbnails:{
            url:string;
          }[];
        }
      }
    };
  }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}):any => {

  let artist;
  try {
    artist = content.musicDetailHeaderRenderer.subtitle.runs[2].text
  } catch (err) {
    console.error("Couldn't parse artist from album header", err)
  }
  let album;
  try {
    album = content.musicDetailHeaderRenderer.title.runs[0].text
  } catch (err) {
    console.error("Couldn't parse title from album header", err)
  }
  let thumbnailUrl;
  try {
    thumbnailUrl = content.musicDetailHeaderRenderer.thumbnail.croppedSquareThumbnailRenderer.thumbnail.thumbnails.pop()?.url
  } catch (err) {
    console.error("Couldn't parse thumbnailUrl from album header", err)
  }
  return {
    artist,
    album,
    thumbnailUrl
  }
}

export const parseMusicFromAlbum = (content: {
  musicResponsiveListItemRenderer:{
    fixedColumns:{
      musicResponsiveListItemFixedColumnRenderer:{
        text:{
          runs:{
            text:string;
          }[]
        }
      }
    }[];
    flexColumns:{
      musicResponsiveListItemFlexColumnRenderer:{
        text:{
          runs:{
            text: string;
            navigationEndpoint:{
              watchEndpoint:{
                videoId: string;
              }
            }
          }[]
        };
      }
    }[];
    badges:{
      musicInlineBadgeRenderer:{
        icon:{
          iconType: string;
        }
      }
    }[];
  }
}):MusicVideo =>{
  let youtubeId;
  try {
    youtubeId =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
        .navigationEndpoint.watchEndpoint.videoId;
  } catch (err) {
    console.log("Couldn't parse youtube id", err);
  }

  let title;
  try {
    title =
      content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
  } catch (err) {
    console.log("Couldn't parse title", err);
  }

  let duration;
  try {
    duration = {
      label:
        content.musicResponsiveListItemRenderer.fixedColumns[0]
          .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text,
      totalSeconds: parseDuration(
        content.musicResponsiveListItemRenderer.fixedColumns[0]
          .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text
      ),
    };
  } catch (err) {
    console.log("Couldn't parse duration", err);
  }
  let isExplicit;
  try {
    isExplicit = content.musicResponsiveListItemRenderer?.badges[0].musicInlineBadgeRenderer.icon.iconType === "MUSIC_EXPLICIT_BADGE"
  } catch (err) {
    isExplicit = false
  }

  return{
    youtubeId,
    title,
    duration,
    isExplicit
  }
}