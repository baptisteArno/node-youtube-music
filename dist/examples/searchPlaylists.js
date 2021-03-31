"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const main = () => src_1.default.searchPlaylists('Dubstep', {
    lang: 'en',
    onlyOfficialPlaylists: true,
});
main().then((results) => console.log(results));
