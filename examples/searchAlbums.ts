import ytMusic from '../src';

const main = () =>
  ytMusic.searchAlbums('Future Nostalgia');

main().then((results) => console.log(results));
