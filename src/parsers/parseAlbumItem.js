import { explicitBadgeText } from '../constants.js';
import { getAlbumType } from './utils.js';

export default function parseAlbumItem(content) {
    let albumId;
    try {
        albumId =
            content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
                .browseId;
    } catch (err) {
        console.error("Couldn't parse albumId", err);
    }

    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    } catch (err) {
        console.error("Couldn't parse title", err);
    }

    let type;
    try {
        type = getAlbumType(
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text
        );
    } catch (err) {
        console.error("Couldn't parse album type", err);
    }

    let thumbnailUrl;
    try {
        thumbnailUrl =
            content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()
                ?.url;
    } catch (err) {
        console.error("Couldn't parse thumbnailUrl", err);
    }

    let artist;
    try {
        artist =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text;
    } catch (err) {
        console.error("Couldn't parse artist", err);
    }

    let artistId;
    try {
        artistId =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[2]
                .navigationEndpoint?.browseEndpoint.browseId;
    } catch (err) {
        console.error("Couldn't parse artistId", err);
    }

    let year;
    try {
        year =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text;
    } catch (err) {
        console.error("Couldn't parse year", err);
    }

    let isExplicit;
    try {
        isExplicit =
            content.musicResponsiveListItemRenderer?.badges[0]
                .musicInlineBadgeRenderer.icon.iconType === explicitBadgeText;
    } catch (err) {
        isExplicit = false;
    }
    return {
        albumId,
        title,
        type,
        thumbnailUrl,
        artist,
        artistId,
        year,
        isExplicit,
    };
};