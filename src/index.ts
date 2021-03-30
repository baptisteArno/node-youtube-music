import searchMusics, { parseMusicsSearchBody } from './searchMusics';
import searchPlaylists, { parsePlaylistsSearchBody } from './searchPlaylists';
import getSuggestions, { parseSuggestionsBody } from './suggestions';
import listMusicsFromPlaylist, {
  parsePlaylist,
} from './listMusicsFromPlaylist';

export default {
  parseMusicsSearchBody,
  parseSuggestionsBody,
  parsePlaylistsSearchBody,
  parsePlaylist,
  searchMusics,
  searchPlaylists,
  getSuggestions,
  listMusicsFromPlaylist,
};
