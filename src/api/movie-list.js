export function handleMovieList (data) {
  let result = []
  data.forEach((item, index) => {
    result.push({
      id: item.id,
      title: item.title,
      images: getPoster(item.images.large),
      casts: filterCasts(item.casts),
      directors: getDirector(item.directors),
      collect_count: item.collect_count,
      score: item.rating.average,
      pubdates: getPubdates(item.pubdates),
      searchShow: getSearchScore(item.rating.average) + '/' + getSearchDates(item.pubdates)
    })
  })
  return result
}

export function handleRankList (data) {
  let result = []
  data.forEach((item, index) => {
    item = item.subject ? item.subject : item
    result.push({
      id: item.id,
      title: item.title,
      images: getPoster(item.images.large),
      casts: filterCasts(item.casts),
      directors: getDirector(item.directors),
      score: item.rating.average
    })
  })
  return result
}

export function handleMovieDetailList (data) {
  let result = Object.assign({}, {
    id: data.id,
    title: data.title,
    original_title: '原名：' + data.original_title,
    yearGenres: yearAndGenres(data.year, data.genres),
    pubdates: '上映时间：' + getSearchDates(data.pubdates),
    durations: '片长：' + data.durations,
    ratings_count: data.ratings_count + '人',
    score: data.rating.average,
    images: getPoster(data.images.large),
    summary: data.summary,
    castList: getCastList(data.directors, data.casts),
    comments_count: data.comments_count,
    reviews_count: data.reviews_count,
    popular_comments: data.popular_comments,
    popular_reviews: data.popular_reviews,
    directors: getDirector(data.directors),
    casts: filterCasts(data.casts)
  })
  return result
}

export function handleAllWorksList (data) {
  let result = []
  data.forEach((item, index) => {
    result.push({
      id: item.subject.id,
      title: item.subject.title,
      images: getPoster(item.subject.images.large),
      casts: getMainCast(item.subject.casts),
      directors: getDirector(item.subject.directors),
      score: item.subject.rating.average
    })
  })
  return result
}

export function handleTagSearch (data) {
  let result = []
  data.forEach((item, index) => {
    result.push({
      id: item.id,
      title: item.title,
      images: getPoster(item.images.large),
      score: item.rating.average + '/' + getSearchDates(item.pubdates)
    })
  })
  return result
}

function getMainCast (cast) {
  return cast.length ? cast[0].name : ''
}

function getCastList (directors, cast) {
  let castList = []
  directors.forEach((item, index) => {
    if (item.id && item.avatars) {
      castList.push({
        id: item.id,
        imgurl: getPoster(item.avatars.large),
        castName: item.name,
        castTitle: '导演'
      })
    }
  })
  cast.forEach((item, index) => {
    castList.push({
      id: item.id,
      imgurl: getPoster(item.avatars.large),
      castName: item.name
    })
  })
  return castList
}

function yearAndGenres (year, genres) {
  return year + '/' + genres.join('/')
}

function filterCasts (casts) {
  let castname = ''
  casts.forEach((item, index) => {
    if (index < casts.length - 1) {
      castname += item.name + '/'
    } else {
      castname += item.name
    }
  })
  return castname
}

function getPoster (imgUrl) {
  if (imgUrl) {
    let url = imgUrl.substring(7)
    return 'https://images.weserv.nl/?url=' + url
  }
}

function getDirector (directors) {
  return directors.length ? directors[0].name : ''
}

function getPubdates (pubdates) {
  let dates = ''
  pubdates.forEach((item, index) => {
    if (item.indexOf('中国大陆') > -1) {
      dates = item.split('(')[0]
      dates = handlePubDate(dates)
    }
  })
  return dates
}

function getSearchDates (pubdates) {
  let dates = ''
  pubdates.forEach((item, index) => {
    if (item.indexOf('中国大陆') > -1) {
      dates = item
    }
  })
  if (!dates.length) {
    if (pubdates.length) {
      dates = pubdates[0]
    }
  }
  return dates
}

function getSearchScore (score) {
  if (score === 0) {
    return '暂无评分'
  } else {
    return score
  }
}

function handleYear (pubdates) {
  return parseInt(new Date(pubdates).getFullYear()) > parseInt(new Date().getFullYear())
}

function handlePubDate (pubdates) {
  const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  let currentWeek = week[new Date(pubdates).getDay()]
  let date = ''
  if (!pubdates.split('-')[1]) {
    date = '待定'
  } else {
    let day = pubdates.split('-')[2] ? pubdates.split('-')[2] + '日' : '待定'
    date = pubdates.split('-')[1] + '月' + day
  }
  if (date.substr(0, 1) === '0') {
    date = date.substr(1)
  }
  let result = date + ' ' + currentWeek
  if (handleYear(pubdates)) {
    result = pubdates.split('-')[0] + '年' + date + ' ' + currentWeek
  }
  return result
}
