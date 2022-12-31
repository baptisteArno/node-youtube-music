import { getSuggestions } from '../suggestions';

test('Should always return a list of suggestions', async () => {
  const result = await getSuggestions('ronQgBo0ZCY');
  expect(result.length).toBeGreaterThan(1);
});
