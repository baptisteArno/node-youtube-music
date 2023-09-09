import { explicitBadgeText } from '../constants.js';

export default function parseMusicItem(content) {
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
        const { length } =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs;
        album = {
            title: content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[length - 3].text,
            albumId: content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[length - 3].navigationEndpoint.browseEndpoint.browseId
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
        const label =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[
                content.musicResponsiveListItemRenderer.flexColumns[1]
                    .musicResponsiveListItemFlexColumnRenderer.text.runs.length - 1
            ].text;
        duration = {
            label,
            totalSeconds: parseDuration(label),
        };
    } catch (err) { }
    let isExplicit;
    try {
        isExplicit =
            content.musicResponsiveListItemRenderer.badges[0].musicInlineBadgeRenderer
                .icon.iconType === explicitBadgeText;
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