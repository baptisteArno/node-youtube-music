import ytMusic from '../src';

const main = async () => {
  const music = (
    await ytMusic.searchMusics('Liem if only', { lang: 'fr', country: 'FR' })
  ).shift();
  if (!music) {
    throw Error();
  }
  if (!music.youtubeId) return;
  ytMusic.getSuggestions(music.youtubeId, {
    lang: 'fr',
    country: 'FR',
  });
};

main().then((results) => console.log(results));
