import * as types from './mutation-types'

const mutations = {
  [types.SET_WANTED_MOVIES] (state, movies) {
    state.wantedMovies = movies
  },
  [types.SET_WATCHED_MOVIES] (state, movies) {
    state.watchedMovies = movies
  },
  [types.SET_CELEBRITIES] (state, celebrities) {
    state.celebrities = celebrities
  },
  [types.SAVE_SEARCHHISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.DELETE_SEARCHHISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  },
  [types.CLEAR_SEARCHHISTORY] (state, searchHistory) {
    state.searchHistory = searchHistory
  }
}

export default mutations
