import { test, expect } from 'vitest';
import { searchMusics } from '../searchMusics.js';

test('Search human readable queries should return a list of results', async () => {
  const queries = [
    'never gonna give you up',
    'liem if only',
    'madonna',
    'david guetta',
  ];

  const results = await Promise.all(
    queries.map((query) => searchMusics(query))
  );
  results.forEach((result) => {
    expect(result.length).toBeGreaterThan(1);
  });
});
