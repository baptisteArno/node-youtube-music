"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMusicFromPlaylist = exports.parsePlaylistsSearchResults = exports.parseSuggestion = exports.parseSongSearchResult = exports.parseDuration = void 0;
// eslint-disable-next-line import/prefer-default-export
const parseDuration = (durationLabel) => {
    const durationList = durationLabel.split(':');
    return durationList.length === 3
        ? parseInt(durationList[0], 10) * 3600 +
            parseInt(durationList[1], 10) * 60 +
            parseInt(durationList[2], 10)
        : parseInt(durationList[0], 10) * 60 + parseInt(durationList[1], 10);
};
exports.parseDuration = parseDuration;
const parseSongSearchResult = (content) => {
    var _a;
    if (!content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint) {
        return null;
    }
    return {
        youtubeId: content.musicResponsiveListItemRenderer.flexColumns[0]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
            .navigationEndpoint.watchEndpoint.videoId,
        title: content.musicResponsiveListItemRenderer.flexColumns[0]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        artist: content.musicResponsiveListItemRenderer.flexColumns[1]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        album: content.musicResponsiveListItemRenderer.flexColumns[1]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text,
        thumbnailUrl: (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url,
        duration: {
            label: content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text,
            totalSeconds: exports.parseDuration(content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text),
        },
    };
};
exports.parseSongSearchResult = parseSongSearchResult;
const parseSuggestion = (content) => {
    var _a;
    if (!content.playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint.videoId) {
        return null;
    }
    return {
        youtubeId: content.playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint
            .videoId,
        title: content.playlistPanelVideoRenderer.title.runs[0].text,
        artist: content.playlistPanelVideoRenderer.longBylineText.runs[0].text,
        album: content.playlistPanelVideoRenderer.longBylineText.runs[2].text,
        thumbnailUrl: (_a = content.playlistPanelVideoRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url,
        duration: {
            label: content.playlistPanelVideoRenderer.lengthText.runs[0].text,
            totalSeconds: exports.parseDuration(content.playlistPanelVideoRenderer.lengthText.runs[0].text),
        },
    };
};
exports.parseSuggestion = parseSuggestion;
const parsePlaylistsSearchResults = (content, onlyOfficialPlaylists) => {
    var _a;
    if (!content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
        .browseId) {
        return null;
    }
    if (onlyOfficialPlaylists &&
        content.musicResponsiveListItemRenderer.flexColumns[1]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text !==
            'YouTube Music') {
        return null;
    }
    return {
        title: content.musicResponsiveListItemRenderer.flexColumns[0]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        totalSongs: parseInt(content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].text.split(' ')[0], 10),
        thumbnailUrl: (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url,
        playlistId: content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
            .browseId,
    };
};
exports.parsePlaylistsSearchResults = parsePlaylistsSearchResults;
const parseMusicFromPlaylist = (content) => {
    var _a;
    if (!content.musicResponsiveListItemRenderer.flexColumns[0]
        .musicResponsiveListItemFlexColumnRenderer.text.runs[0].navigationEndpoint
        .watchEndpoint.videoId) {
        return null;
    }
    return {
        youtubeId: content.musicResponsiveListItemRenderer.flexColumns[0]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
            .navigationEndpoint.watchEndpoint.videoId,
        title: content.musicResponsiveListItemRenderer.flexColumns[0]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        artist: content.musicResponsiveListItemRenderer.flexColumns[1]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        album: content.musicResponsiveListItemRenderer.flexColumns[2]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
        thumbnailUrl: (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url,
        duration: {
            label: content.musicResponsiveListItemRenderer.fixedColumns[0]
                .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text,
            totalSeconds: exports.parseDuration(content.musicResponsiveListItemRenderer.fixedColumns[0]
                .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text),
        },
    };
};
exports.parseMusicFromPlaylist = parseMusicFromPlaylist;
