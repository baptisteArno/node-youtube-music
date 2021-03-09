"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
const main = () => src_1.default.search('sitting waiting wishing', { lang: 'fr-FR', country: 'FR' });
main().then((results) => console.log(results));
