import ytMusic from '../src';

const main = () => ytMusic.searchMusics('DJOKO', { lang: 'fr', country: 'FR' });

main().then((results) => console.log(results));
