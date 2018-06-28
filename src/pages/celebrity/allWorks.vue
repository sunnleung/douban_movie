<template>
  <div>
    <div class="header border-bottom">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="title">全部作品</span>
      <span class="iconfont towardtop" @click="scrollTop">&#xe8f3;</span>
    </div>
    <div class="works-list" ref="worksListWrapper">
      <ul class="works-list-container">
        <router-link :to="/detail/+item.id" tag="li" class="works-item border-bottom" v-for="item in allWorksList" :key="item.id">
          <div class="poster-block">
            <img v-lazy="item.images" alt=""/>
          </div>
          <div class="info">
            <span class="title">{{item.title}}</span>
            <star :score="item.score"></star>
            <span>导演：{{item.directors}}</span>
            <span>主演：{{item.casts}}</span>
          </div>
        </router-link>
        <loadmore v-if="isLoading" :hasMoreData="hasMoreData"></loadmore>
      </ul>
    </div>
  </div>
</template>

<script>
import star from '../../common/star/star'
import BScroll from 'better-scroll'
import { getCelebrityAllWorks } from 'api/movie-celebrity'
import { handleAllWorksList } from 'api/movie-list'
import loadmore from '../../common/loadmore/loadmore'
export default {
  name: 'allworks',
  data () {
    return {
      allWorksList: [],
      start: 0,
      count: 20,
      total: 0,
      isLoading: false,
      hasMoreData: true
    }
  },
  components: {
    star,
    loadmore
  },
  methods: {
    loadMoreFn () {
      if (this.isLoading) {
        return
      }
      this.handleGetAllWorks(this.start, this.count)
    },
    handleGetAllWorks (start, count) {
      const celebrityID = this.$route.params.celebrityID
      this.isLoading = true
      getCelebrityAllWorks(celebrityID, start, count).then((res) => {
        this.allWorksList = this.allWorksList.concat(handleAllWorksList(res.works))
        this.total = this.total === 0 ? res.total : this.total
        this.start += this.count
        if (this.start >= this.total) {
          this.hasMoreData = false
          this.isLoading = true
        } else {
          this.isLoading = false
        }
      })
    },
    handleScroll () {
      this.scroll = new BScroll(this.$refs.worksListWrapper, {
        click: true
      })
      this.scroll.on('scrollEnd', (pos) => {
        if (pos.y <= this.scroll.maxScrollY + 40) {
          this.loadMoreFn()
        }
      })
    },
    scrollTop () {
      this.scroll.scrollTo(0, 0, 500)
    }
  },
  mounted () {
    this.handleScroll()
  },
  created () {
    this.handleGetAllWorks(this.start, this.count)
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
  &:before
   border-color: #999
  .header
    position: relative
    height: 1rem
    .back
      margin-left: .12rem
      display: inline-block
      padding: .3rem
      font-size: .36rem
      color: #42bd56
    .title
      line-height: 1rem
      font-size: .32rem
      color: #777
    .towardtop
      position: absolute
      right: .12rem
      padding: .3rem
      color: #42bd56
      font-size: .4rem
  .works-list
    position: absolute
    top: 1rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .works-list-container
      padding-bottom: .6rem
      .works-item
        padding: .3rem
        height: 2.6rem
        box-sizing: border-box
        display: flex
        .poster-block
          margin-right: .2rem
          flex: 1.4rem 0 0
          img
            height: 2rem
            width: 1.4rem
        .info
          display: flex
          flex-direction: column
          padding-bottom: .4rem
          height: 2rem
          justify-content: space-around
          overflow: hidden
          font-size: .24rem
          box-sizing: border-box
          .title
            font-size: .32rem
            color: #333
</style>
