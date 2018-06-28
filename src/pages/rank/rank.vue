<template>
  <div>
    <div class="search">
      <div class="logo">
        <img src="../../assets/logo.png" class="logoImg" alt="">
      </div>
      <router-link to="/search" tag="div" class="searchInput">
        <span class="iconfont">&#xe627;</span>
        <span>电影/影人/标签"</span>
      </router-link>
    </div>
    <div class="rank-list-wrapper" ref="RankBriefWrapper">
      <div class="rank-list-container">
        <h1 class="title">精选榜单</h1>
        <rank-billboard
          v-for="(item, index) in billboardList"
          :key="index"
          :billboardList="item"
          @click.native="goDetail(item.rankType)"
        ></rank-billboard>
      </div>
    </div>
  </div>
</template>

<script>
import rankBillboard from './components/billboard'
import { getTop250, publicPraise, freshRank, northUSARank } from 'api/movie-rank'
import BScroll from 'better-scroll'
import WeekDate from 'api/date'
export default {
  name: 'rank',
  data () {
    return {
      billboardList: [{
        rankType: 'top250',
        boardDesc: '豆瓣 Top250',
        secDesc: '8分以上好电影',
        imgGroup: [],
        bgLinearColor: ['#e1a708', '#efd491']
      }, {
        rankType: 'weekly',
        boardDesc: '本周口碑榜',
        secDesc: '',
        imgGroup: [],
        bgLinearColor: ['#32c05e', '#a1e5be']
      }, {
        rankType: 'new-movies',
        boardDesc: '新片榜',
        secDesc: '',
        imgGroup: [],
        bgLinearColor: ['#a361c3', '#d9b9e8']
      }, {
        rankType: 'us_box',
        boardDesc: '北美票房榜',
        secDesc: '',
        imgGroup: [],
        bgLinearColor: ['#dd7286', '#f3b9c5']
      }],
      weekDate: ''
    }
  },
  methods: {
    goDetail (rankType) {
      this.$router.push('/rank/' + rankType)
    },
    handleBriefScroll () {
      this.scroll = new BScroll(this.$refs.RankBriefWrapper, {
        click: true
      })
    },
    getPoster (imgUrl) {
      if (imgUrl) {
        let url = imgUrl.substring(7)
        return 'https://images.weserv.nl/?url=' + url
      }
    },
    filterUrl (data) {
      let imgGroup = []
      data.forEach((item, index) => {
        let subject = item.subjects.slice(0, 3)
        imgGroup[index] = []
        subject.forEach((item) => {
          imgGroup[index].push(this.getPoster(item.subject ? item.subject.images.medium : item.images.medium))
        })
      })
      return imgGroup
    },
    getBriefRank () {
      Promise.all([getTop250(0, 3), publicPraise(), freshRank(), northUSARank()]).then((res) => {
        const list = this.filterUrl(res)
        list.forEach((item, index) => {
          this.billboardList[index].imgGroup = item
        })
      })
    },
    getWeekDate () {
      let date = new WeekDate()
      let startDay = date.getWeekStartDate()
      let endDay = date.getWeekEndDate()
      this.billboardList.forEach((item, index) => {
        if (item.secDesc.length === 0) {
          item.secDesc = startDay + '-' + endDay
        }
      })
    }
  },
  mounted () {
    this.handleBriefScroll()
  },
  created () {
    this.getBriefRank()
    this.getWeekDate()
  },
  components: {
    rankBillboard
  }
}
</script>

<style lang="stylus" scoped>
  .search
    display: flex
    height: .84rem
    padding: .16rem .16rem 0 .26rem
    .logo
      flex: 1
      .logoImg
        width: .7rem
        height: .7rem
    .searchInput
      background: #eee
      font-size: .32rem
      line-height: .7rem
      border-radius: .1rem
      height: .72rem
      width: 6.1rem
      text-align: center
  .rank-list-wrapper
    padding: 0 .3rem
    position: absolute
    left: 0
    right: 0
    top: 1rem
    bottom: 1.2rem
    overflow: hidden
    .rank-list-container
      padding: .4rem 0
      .title
        color: #333
</style>
