<template>
  <div>
    <div class="celebrity-header">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      影人
    </div>
    <poster :posterUrl="posterImg"></poster>
    <div class="celebrity-info">
      <div class="celebrity-name-block">
        <div class="celebrity-name">
          <p class="name-cn">{{celebrityList.name}}</p>
          <p>{{celebrityList.name_en}}</p>
        </div>
        <div class="collectBtn" :class="collected?'collected':'uncollect'" @click="handleCollect">
          <span class="iconfont iconsize">&#xe623;</span>
          {{collected?'已收藏':'收藏'}}
        </div>
      </div>
      <div class="celebrity-block">
        <h1>个人简介</h1>
        <p class="introduce-content">
          {{celebrityList.summary}}
          <span class="iconfont toward">&#xe61c;</span>
        </p>
      </div>
      <div class="celebrity-block">
        <h1>代表作品</h1>
        <div class="production-wrapper" ref="productionWrapper">
          <div class="production-list" ref="productionList">
            <router-link :to="/detail/+item.id" tag="div" class="production" v-for="item in productionList" :key="item.id">
              <img
                :src="item.images"
                alt=""
                class="production-poster"
              />
              <p class="production-name">{{item.title}}</p>
              <star :score="item.score"></star>
            </router-link>
          </div>
        </div>
      </div>
      <router-link :to="{path: 'works'}" append tag="div" class="showAllWorkBtn border-top">
        查看所有作品
        <span class="iconfont toward">&#xe61c;</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import poster from '../../common/poster/poster'
import star from '../../common/star/star'
import { getCelebrity } from 'api/movie-celebrity'
import BScroll from 'better-scroll'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'celebrity',
  data () {
    return {
      productionList: [],
      celebrityList: [],
      posterImg: ''
    }
  },
  computed: {
    productionBerif () {
      let productions = ''
      for (let i = 0; i < 3; i++) {
        if (this.productionList[i]) {
          if (productions.length === 0) {
            productions += this.productionList[i].title
          } else {
            productions += '/' + this.productionList[i].title
          }
        }
      }
      return productions
    },
    collectCelebrity () {
      return {
        id: this.$route.params.celebrityID,
        images: this.posterImg,
        name: this.celebrityList.name,
        productions: this.productionBerif
      }
    },
    ...mapGetters([
      'celebrities'
    ]),
    collected () {
      const index = this.celebrities.findIndex((item) => {
        return item.id === this.collectCelebrity.id
      })
      if (index > -1) {
        return true
      }
      return false
    }
  },
  methods: {
    handleScroll () {
      this.scroll = new BScroll(this.$refs.productionWrapper, {
        click: true,
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    },
    handleCollect () {
      this.markCelebrity(this.collectCelebrity)
    },
    handleGetCelebrity () {
      const celebrityID = this.$route.params.celebrityID
      getCelebrity(celebrityID).then((res) => {
        this.celebrityList = res
        this.posterImg = this.getPoster(res.avatars.large)
        this.productionList = this.handleProduction(res.works)
      })
    },
    setProductionListWidth () {
      const productionListEL = this.$refs.productionList
      const margin = 0.16
      const width = 1.8
      let sumWidth = (margin + width) * this.productionList.length - margin
      productionListEL.style.width = sumWidth + 'rem'
    },
    getPoster (imgUrl) {
      if (imgUrl) {
        let url = imgUrl.substring(7)
        return 'https://images.weserv.nl/?url=' + url
      }
    },
    handleProduction (list) {
      let result = []
      list.forEach((item, index) => {
        result.push({
          id: item.subject.id,
          title: item.subject.title,
          score: item.subject.rating.average,
          images: this.getPoster(item.subject.images.large)
        })
      })
      return result
    },
    ...mapActions([
      'markCelebrity'
    ])
  },
  created () {
    this.handleGetCelebrity()
  },
  mounted () {
    this.handleScroll()
    this.setProductionListWidth()
  },
  components: {
    poster,
    star
  }
}
</script>

<style lang="stylus" scoped>
  .border-top
  &:before
    border-color: #777
  .celebrity-header
    position: fixed
    top: 0
    height: .8rem
    z-index: 99
    background-color: rgba(85, 85, 85, .6)
    text-align: center
    width: 100%
    color: #fff
    font-size: .32rem
    line-height: .8rem
    .back
      position: absolute
      left: .12rem
      padding: 0 .2rem
      font-size: .26rem
  .celebrity-info
    padding: .3rem .4rem 0
    background: #fff
    color: #777
    .celebrity-name-block
      display: flex
      justify-content: space-between
      .celebrity-name
        font-size: .14rem
        .name-cn
          font-size: .3rem
          padding-bottom: .14rem
          color: #333
      .collectBtn
        width: 1.6rem
        height: .6rem
        line-height: .6rem
        text-align: center
        border: .02rem solid #42bd56
        border-radius: .2rem
        color: #42bd56
        font-size: .28rem
        .iconsize
          font-size: .28rem
      .collected
        color: #fe9800
        border: .02rem solid #fe9800
      .uncollect
        border: .02rem solid #42bd56
        color: #42bd56
    .celebrity-block
      margin-top: .6rem
      h1
        margin-bottom: .4rem
      .introduce-content
        padding-right: .3rem
        color: #333
        line-height: .4rem
        position: relative
        .toward
          position: absolute
          right: 0
          top: 50%
          transform: translateY(-50%)
          font-size: .4rem
          color: #42bd56
      .production-wrapper
        position: relative
        overflow: hidden
        margin-bottom: .4rem
        .production-list
          white-space: nowrap
          .production
            display: inline-block
            margin-right: .16rem
            font-size: .26rem
            width: 1.8rem
            .production-poster
              width: 1.8rem
              height: 2.4rem
            .production-name
              color: #333
              padding: .16rem 0 .1rem
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
    .showAllWorkBtn
      padding: .4rem 0
      font-size: .26rem
      color: #777
      .toward
        position: absolute
        top: 50%
        transform: translateY(-50%)
</style>
