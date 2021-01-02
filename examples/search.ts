import ytMusic from '../src';

const main = () => ytMusic.search('Deadmau5', { lang: 'fr', country: 'FR' });

main().then((results) => console.log(results));
