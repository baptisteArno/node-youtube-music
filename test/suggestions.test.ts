import ytm from '../src';

test('Should always return a list of suggestions', async () => {
  const ids = ['RyUK5vbhq9E', 'B2mmDEv0OEk', 'EfgAd6iHApE'];

  const results = await Promise.all(ids.map((id) => ytm.getSuggestions(id)));
  results.forEach((result) => {
    expect(result.length).toBeGreaterThan(1);
  });
});
