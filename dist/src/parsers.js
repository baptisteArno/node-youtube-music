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
    let youtubeId;
    try {
        youtubeId =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
                .navigationEndpoint.watchEndpoint.videoId;
    }
    catch (err) {
        console.log("Couldn't parse youtube id", err);
    }
    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse title", err);
    }
    let artist;
    try {
        artist =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse artist", err);
    }
    let album;
    try {
        album =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[2].text;
    }
    catch (err) {
        console.log("Couldn't parse album", err);
    }
    let thumbnailUrl;
    try {
        thumbnailUrl = (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url;
    }
    catch (err) {
        console.log("Couldn't parse thumbnailUrl", err);
    }
    let duration;
    try {
        duration = {
            label: content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text,
            totalSeconds: exports.parseDuration(content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[4].text),
        };
    }
    catch (err) {
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
exports.parseSongSearchResult = parseSongSearchResult;
const parseSuggestion = (content) => {
    var _a;
    let youtubeId;
    try {
        youtubeId =
            content.playlistPanelVideoRenderer.navigationEndpoint.watchEndpoint
                .videoId;
    }
    catch (err) {
        console.log("Couldn't parse youtube id", err);
    }
    let title;
    try {
        title = content.playlistPanelVideoRenderer.title.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse title", err);
    }
    let artist;
    try {
        artist = content.playlistPanelVideoRenderer.longBylineText.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse artist", err);
    }
    let album;
    try {
        album = content.playlistPanelVideoRenderer.longBylineText.runs[2].text;
    }
    catch (err) {
        console.log("Couldn't parse album", err);
    }
    let thumbnailUrl;
    try {
        thumbnailUrl = (_a = content.playlistPanelVideoRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url;
    }
    catch (err) {
        console.log("Couldn't parse thumbnailUrl", err);
    }
    let duration;
    try {
        duration = {
            label: content.playlistPanelVideoRenderer.lengthText.runs[0].text,
            totalSeconds: exports.parseDuration(content.playlistPanelVideoRenderer.lengthText.runs[0].text),
        };
    }
    catch (err) {
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
exports.parseSuggestion = parseSuggestion;
const parsePlaylistsSearchResults = (content, onlyOfficialPlaylists) => {
    var _a;
    let playlistId;
    try {
        playlistId =
            content.musicResponsiveListItemRenderer.navigationEndpoint.browseEndpoint
                .browseId;
    }
    catch (err) {
        console.log("Couldn't parse youtube id", err);
    }
    if (onlyOfficialPlaylists &&
        content.musicResponsiveListItemRenderer.flexColumns[1]
            .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text !==
            'YouTube Music') {
        return null;
    }
    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse title", err);
    }
    let totalSongs;
    try {
        totalSongs = parseInt(content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[2].text.split(' ')[0], 10);
    }
    catch (err) {
        console.log("Couldn't parse artist", err);
    }
    let thumbnailUrl;
    try {
        thumbnailUrl = (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url;
    }
    catch (err) {
        console.log("Couldn't parse thumbnailUrl", err);
    }
    return {
        playlistId,
        title,
        totalSongs,
        thumbnailUrl,
    };
};
exports.parsePlaylistsSearchResults = parsePlaylistsSearchResults;
const parseMusicFromPlaylist = (content) => {
    var _a;
    let youtubeId;
    try {
        youtubeId =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
                .navigationEndpoint.watchEndpoint.videoId;
    }
    catch (err) {
        console.log("Couldn't parse youtube id", err);
    }
    let title;
    try {
        title =
            content.musicResponsiveListItemRenderer.flexColumns[0]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse title", err);
    }
    let artist;
    try {
        artist =
            content.musicResponsiveListItemRenderer.flexColumns[1]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse artist", err);
    }
    let album;
    try {
        album =
            content.musicResponsiveListItemRenderer.flexColumns[2]
                .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;
    }
    catch (err) {
        console.log("Couldn't parse album", err);
    }
    let thumbnailUrl;
    try {
        thumbnailUrl = (_a = content.musicResponsiveListItemRenderer.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails.pop()) === null || _a === void 0 ? void 0 : _a.url;
    }
    catch (err) {
        console.log("Couldn't parse thumbnailUrl", err);
    }
    let duration;
    try {
        duration = {
            label: content.musicResponsiveListItemRenderer.fixedColumns[0]
                .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text,
            totalSeconds: exports.parseDuration(content.musicResponsiveListItemRenderer.fixedColumns[0]
                .musicResponsiveListItemFixedColumnRenderer.text.runs[0].text),
        };
    }
    catch (err) {
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
exports.parseMusicFromPlaylist = parseMusicFromPlaylist;
