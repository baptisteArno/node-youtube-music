import ytMusic from '../src';

const main = () =>
  ytMusic.searchPlaylists('Jazz', { lang: 'fr', country: 'FR' });

main().then((results) => console.log(results));
