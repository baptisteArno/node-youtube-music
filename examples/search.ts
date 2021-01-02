import ytMusic from 'node-youtube-music';

const main = () => ytMusic.search('Deadmau5', { lang: 'fr', country: 'FR' });

main().then((results) => console.log(results));
