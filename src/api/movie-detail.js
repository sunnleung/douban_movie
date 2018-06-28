import axios from 'axios'
import { commonParams } from './config'

export function getMovieDetail (id) {
  const url = '/v2/movie/subject/' + id
  const data = Object.assign({}, commonParams)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getComment (id, start, count) {
  const url = '/v2/movie/subject/' + id + '/comments'
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getReview (id, start, count) {
  const url = '/v2/movie/subject/' + id + '/reviews'
  const data = Object.assign({}, commonParams, {
    start,
    count
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getSingleReview (id) {
  const url = '/v2/movie/review/' + id
  const data = Object.assign({}, commonParams)
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}
