import { test, expect } from 'vitest';
import { listMusicsFromAlbum } from '../listMusicsFromAlbum.js';
import { searchAlbums } from '../searchAlbums.js';

test('Search for Heaven & Hell album, pick first and get song list', async () => {
  const query = 'Heaven & Hell';

  const results = await searchAlbums(query);
  expect(results.length).toBeGreaterThan(1);
  const firstAlbum = results.shift();
  expect(firstAlbum).toBeDefined();
  const albumId = firstAlbum?.albumId;
  expect(albumId).toBeDefined();
  const songsResult = await listMusicsFromAlbum(albumId ?? '');
  expect(songsResult.length).toBeGreaterThan(1);
});
