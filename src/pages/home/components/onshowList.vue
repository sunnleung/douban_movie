<template>
  <div class="wrapper" ref="wrapper">
    <movie-list
      :showList="onshowList"
      :isLoading="isLoading"
      :hasMoreData="hasMoreOnline"
      v-if="showOnline"
      :showOnline="showOnline"
    ></movie-list>
    <movie-list
      :showList="comingList"
      :isLoading="isComingLoading"
      :hasMoreData="hasMoreComing"
      :showOnline="showOnline"
      :nowScrollY="nowScrollY"
      v-else
      ></movie-list>
  </div>
</template>

<script>
import bus from 'api/bus'
import { getMovie, getComingMovie } from 'api/movie-show'
import movieList from './movieList'
import BScroll from 'better-scroll'
import { handleMovieList } from 'api/movie-list'
export default {
  name: 'HomeList',
  components: {
    movieList
  },
  data () {
    return {
      onshowList: [],
      comingList: [],
      needLoadMore: false,
      onceLoadCount: 10,
      nowLoadNum1: 0,
      nowLoadNum2: 0,
      isLoading: false,
      isComingLoading: false,
      hasMoreOnline: true,
      hasMoreComing: true,
      showOnline: true,
      nowScrollY: 0
    }
  },
  methods: {
    loadmoreFn (start, count) {
      if (this.showOnline) {
        if (this.isLoading) {
          return
        }
        this.isLoading = true
        getMovie(start, count).then((res) => {
          this.checkMoreData(res)
          let loadList = handleMovieList(res.subjects)
          this.onshowList = this.onshowList.concat(loadList)
          this.nowLoadNum1 = start + count
          if (this.hasMoreOnline) {
            this.isLoading = false
          }
        })
      } else {
        if (this.isComingLoading) {
          return
        }
        this.isComingLoading = true
        getComingMovie(start, count).then((res) => {
          this.checkMoreData(res)
          let loadList = handleMovieList(res.subjects)
          this.comingList = this.comingList.concat(loadList)
          this.nowLoadNum2 = start + count
          if (this.hasMoreComing) {
            this.isComingLoading = false
          }
        })
      }
    },
    checkMoreData (data) {
      const movieData = data.subjects
      if (!movieData.length || data.start + data.count > data.total) {
        if (this.showOnline) {
          this.hasMoreOnline = false
          this.isLoading = true
        } else {
          this.hasMoreComing = false
          this.isComingLoading = true
        }
      }
    },
    handleScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: 3,
        click: true
      })
      this.scroll.on('scroll', (pos) => {
        if (!this.showOnline) {
          this.nowScrollY = pos.y
        }
        if (pos.y <= this.scroll.maxScrollY + 40) {
          this.showOnline ? this.loadmoreFn(this.nowLoadNum1, this.onceLoadCount) : this.loadmoreFn(this.nowLoadNum2, this.onceLoadCount)
        }
      })
    },
    getTabShow () {
      bus.$on('tabShow', tabShowNow => {
        this.showOnline = tabShowNow
        if (this.showOnline) {
          this.scroll.scrollTo(0, 0)
        } else {
          this.scroll.scrollTo(0, this.nowScrollY)
          this.scroll.refresh()
        }
      })
    }
  },
  mounted () {
    this.getTabShow()
    this.loadmoreFn(this.nowLoadNum1, this.onceLoadCount)
    this.handleScroll()
  },
  watch: {
    showOnline () {
      if (!this.showOnline) {
        if (!this.comingList.length) {
          this.loadmoreFn(this.nowLoadNum2, this.onceLoadCount)
        }
      } else {
        if (!this.onshowList.length) {
          this.loadmoreFn(this.nowLoadNum1, this.onceLoadCount)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    position: absolute
    left: 0
    right: 0
    top: 1.94rem
    bottom: 1.22rem
    overflow: hidden
</style>
