export default function parsePlaylistItem(
    content,
    onlyOfficialPlaylists
) {
    let playlistId;
    try {
        playlistId =
            content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
                .browseId;
    } catch (err) { }
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
    } catch (err) { }

    let totalSongs;
    try {
        totalSongs = parseInt(
            content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].text.split(
                ' '
            )[0],
            10
        );
    } catch (err) { }

    let thumbnailUrl;
    try {
        thumbnailUrl =
            content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
                ?.url;
    } catch (err) { }

    return {
        playlistId,
        title,
        totalSongs,
        thumbnailUrl,
    };
};
