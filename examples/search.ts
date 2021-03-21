import ytMusic from '../src';

const main = () => ytMusic.search('DJOKO', { lang: 'en-GB', country: 'FR' });

main().then((results) => console.log(results));
