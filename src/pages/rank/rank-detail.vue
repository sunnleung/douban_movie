<template>
  <div>
    <div class="header border-bottom">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="title">{{rankName}}</span>
    </div>
    <switches
      :switches="switchesList"
      :smallFont="true"
      v-if="showTop250"
      @switch="handleSwitch"
    ></switches>
    <div class="rank-list-wrapper" :class="showTop250?'top250-rank':'other-rank'" ref="rankListWrapper">
      <ul class="rank-list">
        <router-link :to="/detail/+item.id" tag="li" class="rank-item" v-for="(item,index) in rankList[rankIndex]" :key="index">
          <div class="item-index-block">
            <div class="line"></div>
            <span class="item-index">{{50*rankIndex+index+1}}</span>
          </div>
          <div class="item-info border">
            <div class="poster-block">
              <img v-lazy="item.images" alt="" class="poster"/>
            </div>
            <div class="movie-info">
              <span class="title">{{item.title}}</span>
              <star :score="item.score"></star>
              <span>导演：{{item.directors}}</span>
              <span>主演: {{item.casts}}</span>
            </div>
          </div>
        </router-link>
        <loadmore v-if="isLoading" :hasMoreData="hasMoreData[rankIndex]"></loadmore>
      </ul>
    </div>
  </div>
</template>

<script>
import switches from '../../common/switches/switches'
import star from '../../common/star/star'
import loadmore from '../../common/loadmore/loadmore'
import { getTop250, publicPraise, freshRank, northUSARank } from 'api/movie-rank'
import { handleRankList } from 'api/movie-list'
import BScroll from 'better-scroll'
export default {
  name: 'rankDetail',
  data () {
    return {
      switchesList: ['1-50', '51-100', '101-150', '151-200', '201-250'],
      dataFn: null,
      rankName: '',
      showTop250: false,
      start: 0,
      count: 10,
      rankList: [],
      isLoading: true,
      hasMoreData: [],
      rankIndex: 0
    }
  },
  methods: {
    getNowRank () {
      const nowRank = this.$route.params.rankType
      switch (nowRank) {
        case 'top250':
          this.dataFn = getTop250
          this.rankName = '豆瓣 Top250'
          this.showTop250 = true
          break
        case 'weekly':
          this.dataFn = publicPraise
          this.rankName = '本周口碑榜'
          break
        case 'new-movies':
          this.dataFn = freshRank
          this.rankName = '新片榜'
          break
        case 'us_box':
          this.dataFn = northUSARank
          this.rankName = '北美票房榜'
          break
      }
    },
    handleSwitch (index) {
      this.rankIndex = index
    },
    loadMoreFn () {
      if (this.isLoading || !this.hasMoreData[this.rankIndex]) {
        return
      }
      this.getRankData()
    },
    getRankData () {
      this.isLoading = true
      this.start = this.rankList[this.rankIndex].length ? this.rankList[this.rankIndex].length + (50 * this.rankIndex) : (50 * this.rankIndex)
      if (this.showTop250) {
        this.dataFn(this.start, this.count).then((res) => {
          this.rankList[this.rankIndex] = this.rankList[this.rankIndex].concat(handleRankList(res.subjects))
          const total = 50 * (this.rankIndex + 1)
          this.start += this.count
          this.isLoading = false
          if (this.start >= total) {
            this.hasMoreData[this.rankIndex] = false
          }
        })
      } else {
        this.dataFn().then((res) => {
          this.rankList[0] = handleRankList(res.subjects)
          this.isLoading = false
        })
      }
    },
    handleRankListScroll () {
      this.scroll = new BScroll(this.$refs.rankListWrapper, {
        click: true
      })
      if (this.showTop250) {
        this.scroll.on('scrollEnd', (pos) => {
          if (pos.y <= this.scroll.maxScrollY + 40) {
            this.loadMoreFn()
          }
        })
      }
    }
  },
  watch: {
    rankIndex () {
      if (!this.rankList[this.rankIndex].length) {
        this.getRankData()
      }
    }
  },
  created () {
    for (let i = 0; i < this.switchesList.length; i++) {
      this.$set(this.rankList, i, [])
      this.$set(this.hasMoreData, i, true)
    }
    this.getNowRank()
    this.getRankData()
  },
  mounted () {
    this.handleRankListScroll()
  },
  components: {
    switches,
    star,
    loadmore
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
  &:before
    border-color: #777
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
      color: #333
  .rank-list-wrapper
    position: absolute
    bottom: 1.2rem
    left: 0
    right: 0
    overflow: hidden
    &.other-rank
      top: 1rem
    &.top250-rank
      top: 1.82rem
    .rank-list
      padding: 0 .3rem .6rem
      .rank-item
        padding-top: .6rem
        .item-index-block
          margin: .6rem auto
          text-align: center
          width: 50%
          position: relative
          .line
            height: .02rem
            background: #eee
            width: 100%
          .item-index
            position: absolute
            padding: 0 .2rem
            background: #fff
            color: #42bd56
            left: 50%
            top: 50%
            transform: translate(-50%, -50%)
            font-size: .36rem
        .item-info
          display: flex
          box-sizing: border-box
          height: 2.6rem
          padding: .3rem
          &.border
          &:before
            border-color: #777
          .poster-block
            margin-right: .2rem
            flex: 1.4rem 0 0
            .poster
              width: 1.4rem
              height: 2rem
          .movie-info
            height: 2rem
            box-sizing: border-box
            padding-bottom: .4rem
            display: flex
            flex-direction: column
            justify-content: space-around
            overflow: hidden
            font-size: .2rem
            color: #777
            span
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
            .title
              font-size: .28rem
              color: #333
</style>
