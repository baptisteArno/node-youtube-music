import { getSuggestions, searchMusics } from '../src';

const main = async () => {
  const music = (
    await searchMusics('Liem if only', { lang: 'fr', country: 'FR' })
  ).shift();
  if (!music) {
    throw Error();
  }
  if (!music.youtubeId) return;
  getSuggestions(music.youtubeId, {
    lang: 'fr',
    country: 'FR',
  });
};

main().then((results) => console.log(results));
