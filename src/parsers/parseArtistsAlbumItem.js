
import { explicitBadgeText } from '../constants.js';
import { getAlbumType } from './utils.js';

export default function parseArtistsAlbumItem(item) {
    let title;
    try {
        title = item.musicTwoRowItemRenderer.title.runs[0].text;
    } catch (e) {
        console.error("Couldn't get title", e);
    }

    let type;
    try {
        type = getAlbumType(item.musicTwoRowItemRenderer.subtitle.runs[0].text);
    } catch (e) {
        console.error("Couldn't get album type", e);
    }

    let albumId;
    try {
        albumId =
            item.musicTwoRowItemRenderer.title.runs[0].navigationEndpoint
                .browseEndpoint.browseId;
    } catch (e) {
        console.error("Couldn't get albumId", e);
    }

    let year;
    try {
        year = item.musicTwoRowItemRenderer.subtitle.runs.pop()?.text;
    } catch (e) {
        console.error("Couldn't get year", e);
    }

    let isExplicit;
    try {
        isExplicit =
            item.musicTwoRowItemRenderer.subtitleBadges[0].musicInlineBadgeRenderer
                .icon.iconType === explicitBadgeText;
    } catch (e) {
        isExplicit = false;
    }
    let thumbnailUrl;
    try {
        thumbnailUrl =
            item.musicTwoRowItemRenderer.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails.shift()
                ?.url;
    } catch (e) {
        console.error("Couldn't get thumbnailUrl", e);
    }
    return {
        title,
        type,
        albumId,
        year,
        thumbnailUrl,
        isExplicit,
    };
};