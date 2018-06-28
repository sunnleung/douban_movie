import { saveToLocal, loadFromLocal } from './store'
const USER_ID = 'testUser'
const WANTED_KEY = '_wanted_'
const WATCHED_KEY = '_watched_'
const CELEBRITY_KEY = '_celebrity_'
const SEARCH_KEY = '_searchHistory_'

export function saveWantedMovie (movie) {
  let movies = loadFromLocal(USER_ID, WANTED_KEY, [])
  const index = movies.findIndex((item) => {
    return item.id === movie.id
  })
  if (index === -1) {
    movies.push(movie)
  } else {
    movies.splice(index, 1)
  }
  saveToLocal(USER_ID, WANTED_KEY, movies)
  return movies
}

export function loadWantedMovie () {
  return loadFromLocal(USER_ID, WANTED_KEY, [])
}

export function saveWatchedMovie (movie) {
  let movies = loadFromLocal(USER_ID, WATCHED_KEY, [])
  const index = movies.findIndex((item) => {
    return item.id === movie.id
  })
  if (index === -1) {
    movies.push(movie)
  } else {
    movies.splice(index, 1)
  }
  saveToLocal(USER_ID, WATCHED_KEY, movies)
  return movies
}

export function loadWatchedMovie () {
  return loadFromLocal(USER_ID, WATCHED_KEY, [])
}

export function saveCelebrity (celebrity) {
  let celebrities = loadFromLocal(USER_ID, CELEBRITY_KEY, [])
  const index = celebrities.findIndex((item) => {
    return item.id === celebrity.id
  })
  if (index === -1) {
    celebrities.push(celebrity)
  } else {
    celebrities.splice(index, 1)
  }
  saveToLocal(USER_ID, CELEBRITY_KEY, celebrities)
  return celebrities
}

export function loadCelebrity () {
  return loadFromLocal(USER_ID, CELEBRITY_KEY, [])
}

export function saveSearchHistory (searchHistory) {
  let histories = loadFromLocal(USER_ID, SEARCH_KEY, [])
  const index = histories.findIndex((item) => {
    return item === searchHistory
  })
  if (index === -1) {
    histories.unshift(searchHistory)
  }
  saveToLocal(USER_ID, SEARCH_KEY, histories)
  return histories
}

export function deleteSearchHistory (searchHistory) {
  let histories = loadFromLocal(USER_ID, SEARCH_KEY, [])
  const index = histories.findIndex((item) => {
    return item === searchHistory
  })
  histories.splice(index, 1)
  saveToLocal(USER_ID, SEARCH_KEY, histories)
  return histories
}

export function clearSearchHistory () {
  saveToLocal(USER_ID, SEARCH_KEY, [])
  return []
}

export function loadSearchHistory () {
  return loadFromLocal(USER_ID, SEARCH_KEY, [])
}
