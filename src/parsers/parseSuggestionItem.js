import { listArtists, parseDuration } from './utils.js';

export default function parseSuggestionItem(content) {
    let trackId;
    try {
        trackId =
            content.playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint
                .videoId;
    } catch (err) { }

    let title;
    try {
        title = content.playlistPanelVideoRenderer.title.runs[0].text;
    } catch (err) { }

    let artists;
    try {
        artists = listArtists(
            content.playlistPanelVideoRenderer.longBylineText.runs
        );
    } catch (err) { }

    let album;
    try {
        album = content.playlistPanelVideoRenderer.longBylineText.runs[2].text;
    } catch (err) { }

    let isExplicit;
    try {
        isExplicit =
            content.playlistPanelVideoRenderer.badges[0].musicInlineBadgeRenderer.icon
                .iconType === 'MUSIC_EXPLICIT_BADGE';
    } catch (err) {
        isExplicit = false;
    }

    let thumbnailUrl;
    try {
        thumbnailUrl =
            content.playlistPanelVideoRenderer.thumbnail.thumbnails.pop()?.url;
    } catch (err) { }

    let duration;
    try {
        duration = {
            label: content.playlistPanelVideoRenderer.lengthText.runs[0].text,
            totalSeconds: parseDuration(
                content.playlistPanelVideoRenderer.lengthText.runs[0].text
            ),
        };
    } catch (err) { }
    return {
        trackId,
        title,
        artists,
        isExplicit,
        album,
        thumbnailUrl,
        duration,
    };
};
