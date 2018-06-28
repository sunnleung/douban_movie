<template>
  <div class="list-wrapper" ref="listWrapper">
    <ul class="list-container">
      <router-link
        :to="/detail/ + item.id"
        tag="li"
        class="list"
        v-for="item in searchResult"
        :key="item.id"
        @click.native="saveSearch"
      >
        <img v-lazy="item.images"
             alt=""
             class="list-img"
        />
        <div class="list-info">
          <div class="info-title">{{item.title}}</div>
          <div class="info-other">{{item.searchShow}}</div>
        </div>
      </router-link>
      <loadmore :hasMoreData="hasMore" v-if="isLoading"></loadmore>
    </ul>
  </div>
</template>

<script>
import { movieSearch } from 'api/movie-search'
import { handleMovieList } from 'api/movie-list'
import loadmore from '../../../common/loadmore/loadmore'
import BScroll from 'better-scroll'
import bus from 'api/bus'
import { mapActions } from 'vuex'
export default {
  name: 'searchList',
  data () {
    return {
      searchText: '',
      searchResult: [],
      start: 0,
      count: 20,
      hasMore: true,
      isLoading: false
    }
  },
  components: {
    loadmore
  },
  methods: {
    searchListScroll () {
      this.scroll = new BScroll(this.$refs.listWrapper, {
        click: true
      })
      this.scroll.on('scrollEnd', (pos) => {
        if (pos.y <= this.scroll.maxScrollY + 40) {
          this.inputSearch()
        }
      })
    },
    inputSearch () {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      movieSearch(this.searchText, this.start, this.count).then((res) => {
        let dataList = handleMovieList(res.subjects)
        this.checkMoreData(res)
        this.searchResult = this.searchResult.concat(dataList)
        this.isLoading = false
        if (this.hasMore) {
          this.start += this.count
        }
      })
    },
    checkMoreData (data) {
      const movieData = data.subjects
      if (!movieData.length || data.start + data.count > data.total) {
        this.hasMore = false
        this.isLoading = true
      } else {
        this.hasMore = true
      }
    },
    acceptInputBus () {
      bus.$on('inputListener', (innerText) => {
        this.searchText = innerText
      })
    },
    saveSearch () {
      this.markSearchHistory(this.searchText)
    },
    ...mapActions([
      'markSearchHistory'
    ])
  },
  mounted () {
    this.searchListScroll()
    this.acceptInputBus()
  },
  watch: {
    searchText () {
      this.searchResult = []
      this.start = 0
      this.inputSearch()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .list-wrapper
    position: absolute
    top: 1rem
    left: 0
    right: 0
    bottom: 0
    background: #fff
    overflow: hidden
    .list-container
      padding: .3rem .3rem .5rem
      .list
        display: flex
        margin-bottom: .3rem
        height: 1.4rem
        .list-img
          width: 1rem
          height: 1.4rem
          margin-right: .16rem
        .info-title
          font-size: .28rem
          margin-bottom: .16rem
        .info-other
          font-size: .22rem
          color: #777
      .list-bottom
        text-align: center
        color: #777
</style>
