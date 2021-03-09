import ytMusic from '../src';

const main = () =>
  ytMusic.search('sitting waiting wishing', { lang: 'fr-FR', country: 'FR' });

main().then((results) => console.log(results));
