import ytMusic from '../src';

const main = () =>
  ytMusic.listMusicsFromPlaylist(
    'VLRDCLAK5uy_kL57PLcOmExjhzqGfGhvA82ZWe4fPH2c4',
    {
      lang: 'fr',
      country: 'FR',
    }
  );

main().then((results) => console.log(results));
