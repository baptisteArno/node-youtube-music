import { listMusicsFromPlaylist } from '../listMusicsFromPlaylist';
import { searchPlaylists } from '../searchPlaylists';

test('Search for Jazz playlists and the first one should return a list of results', async () => {
  const query = 'jazz';

  const results = await searchPlaylists(query);
  console.log('Results: ', results);
  expect(results.length).toBeGreaterThan(1);
  const firstPlaylist = results.shift();
  expect(firstPlaylist).toBeDefined();
  expect(firstPlaylist?.playlistId).toBeDefined();
  const playlistId = results[0].playlistId;
  expect(playlistId).toBeDefined();
  const songsResult = await listMusicsFromPlaylist(playlistId ?? '');
  expect(songsResult.length).toBeGreaterThan(1);
});
