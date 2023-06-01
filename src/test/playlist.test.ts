import { test, expect } from 'vitest';
import { listMusicsFromPlaylist } from '../listMusicsFromPlaylist.js';
import { searchPlaylists } from '../searchPlaylists.js';

test('Search for Jazz playlists and the first one should return a list of results', async () => {
  const query = 'jazz';

  const results = await searchPlaylists(query);
  expect(results.length).toBeGreaterThan(1);
  const firstPlaylist = results.shift();
  expect(firstPlaylist).toBeDefined();
  expect(firstPlaylist?.playlistId).toBeDefined();
  const songsResult = await listMusicsFromPlaylist(
    firstPlaylist?.playlistId ?? ''
  );
  console.log(firstPlaylist?.playlistId);
  expect(songsResult.length).toBeGreaterThan(1);
});
