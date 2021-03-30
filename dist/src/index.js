"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchMusics_1 = require("./searchMusics");
const searchPlaylists_1 = require("./searchPlaylists");
const suggestions_1 = require("./suggestions");
const listMusicsFromPlaylist_1 = require("./listMusicsFromPlaylist");
exports.default = {
    parseMusicsSearchBody: searchMusics_1.parseMusicsSearchBody,
    parseSuggestionsBody: suggestions_1.parseSuggestionsBody,
    parsePlaylistsSearchBody: searchPlaylists_1.parsePlaylistsSearchBody,
    parsePlaylist: listMusicsFromPlaylist_1.parsePlaylist,
    searchMusics: searchMusics_1.default,
    searchPlaylists: searchPlaylists_1.default,
    getSuggestions: suggestions_1.default,
    listMusicsFromPlaylist: listMusicsFromPlaylist_1.default,
};
