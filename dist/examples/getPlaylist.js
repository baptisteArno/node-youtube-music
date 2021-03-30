"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const main = () => src_1.default.listMusicsFromPlaylist('VLRDCLAK5uy_kL57PLcOmExjhzqGfGhvA82ZWe4fPH2c4', {
    lang: 'fr',
    country: 'FR',
});
main().then((results) => console.log(results));
