import { searchMusics } from '../src';

const main = () => searchMusics('DJOKO', { lang: 'fr', country: 'FR' });

main().then((results) => console.log(results));
