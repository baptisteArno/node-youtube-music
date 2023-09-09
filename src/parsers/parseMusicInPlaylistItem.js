import { explicitBadgeText } from '../constants.js';

export default function parseMusicInPlaylistItem(content) {
    let trackId;
    try {
        trackId =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
                .navigationEndpoint.watchEndpoint.videoId;
    } catch (err) { }

    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    } catch (err) { }

    let artists;
    try {
        artists = listArtists(
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs
        );
    } catch (err) { }

    let album;
    try {
        album = {
            title: content.musicResponsiveListItemRenderer.flexColumns[2]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
            albumId: content.musicResponsiveListItemRenderer.flexColumns[2]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint.browseEndpoint.browseId
        }
    } catch (err) { }

    let thumbnailUrl;
    try {
        thumbnailUrl =
            content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
                ?.url;
    } catch (err) { }

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
    } catch (err) { }

    let isExplicit;
    try {
        isExplicit =
            content.musicResponsiveListItemRenderer?.badges[0]
                .musicInlineBadgeRenderer.icon.iconType === explicitBadgeText;
    } catch (err) {
        isExplicit = false;
    }
    return {
        trackId,
        title,
        artists,
        album,
        thumbnailUrl,
        duration,
        isExplicit,
    };
};