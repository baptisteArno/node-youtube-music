import ytMusic from '../src';

const main = () => ytMusic.search('DJOKO', { lang: 'fr-FR' });

main().then((results) => console.log(results));
