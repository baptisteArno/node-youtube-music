import ytMusic from '../src';

const main = () =>
  ytMusic.searchPlaylists('Dubstep', {
    lang: 'en',
    onlyOfficialPlaylists: true,
  });

main().then((results) => console.log(results));
