import ytMusic from '../src';

const main = () =>
  ytMusic.searchPlaylists('Daft Punk', { onlyOfficialPlaylists: true });

main().then((results) => console.log(results));
