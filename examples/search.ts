import { search } from '../src';

const main = () => search('Deadmau5');

main().then((results) => console.log(results));
