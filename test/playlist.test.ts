import ytm from '../src';

test('Search for Jazz playlists and the first one should return a list of results', async () => {
  const query = 'jazz';

  const results = await ytm.searchPlaylists(query);
  expect(results.length).toBeGreaterThan(1);

  const songsResult = await ytm.listMusicsFromPlaylist(results[0].playlistId);
  expect(songsResult.length).toBeGreaterThan(1);
});
