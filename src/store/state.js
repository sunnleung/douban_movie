import { loadWantedMovie, loadWatchedMovie, loadCelebrity, loadSearchHistory } from 'api/cache'

const state = {
  movie: {},
  wantedMovies: loadWantedMovie(),
  watchedMovies: loadWatchedMovie(),
  celebrities: loadCelebrity(),
  searchHistory: loadSearchHistory()
}

export default state
