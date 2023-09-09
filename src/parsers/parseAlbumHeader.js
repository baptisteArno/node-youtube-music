export default function parseAlbumHeader(content) {
    let artist;
    try {
        artist = {
            name: content.musicDetailHeaderRenderer.subtitle.runs[2].text,
            artistId: content.musicDetailHeaderRenderer.subtitle.runs[2].navigationEndpoint.browseEndpoint.browseId
        };
    } catch (err) {
        console.error("Couldn't parse artist from album header", err);
    }
    let album;
    try {
        album = content.musicDetailHeaderRenderer.title.runs[0].text;
    } catch (err) {
        console.error("Couldn't parse title from album header", err);
    }
    let thumbnailUrl;
    try {
        thumbnailUrl =
            content.musicDetailHeaderRenderer.thumbnail.croppedSquareThumbnailRenderer.thumbnail.thumbnails.pop()
                ?.url;
    } catch (err) {
        console.error("Couldn't parse thumbnailUrl from album header", err);
    }
    return {
        artist,
        album,
        thumbnailUrl,
    };
};