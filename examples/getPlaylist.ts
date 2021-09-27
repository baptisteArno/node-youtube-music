import { listMusicsFromPlaylist } from '../src';

const main = () =>
  listMusicsFromPlaylist('VLRDCLAK5uy_n20FRYQXNt1p1wS55Nj2r14IouO5weaYU', {
    lang: 'fr',
    country: 'FR',
  });

main().then((results) => console.log(results));
