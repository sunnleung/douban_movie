import { saveWantedMovie, saveWatchedMovie, saveCelebrity, saveSearchHistory, deleteSearchHistory, clearSearchHistory } from 'api/cache'
import * as types from './mutation-types'

export const markWantedMovie = function ({commit}, movie) {
  commit(types.SET_WANTED_MOVIES, saveWantedMovie(movie))
}

export const markWatchedMovie = function ({commit}, movie) {
  commit(types.SET_WATCHED_MOVIES, saveWatchedMovie(movie))
}

export const markCelebrity = function ({commit}, celebrity) {
  commit(types.SET_CELEBRITIES, saveCelebrity(celebrity))
}

export const markSearchHistory = function ({commit}, searchHistory) {
  commit(types.SAVE_SEARCHHISTORY, saveSearchHistory(searchHistory))
}

export const deMarkSearchHistory = function ({commit}, searchHistory) {
  commit(types.DELETE_SEARCHHISTORY, deleteSearchHistory(searchHistory))
}

export const clearAllSearchHistory = function ({commit}) {
  commit(types.CLEAR_SEARCHHISTORY, clearSearchHistory())
}
