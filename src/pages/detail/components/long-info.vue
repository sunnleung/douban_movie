<template>
  <div>
    <div class="long-info border-top">
      <h1>剧情简介</h1>
      <p>&nbsp;&nbsp;{{movieDetailList.summary}}</p>
    </div>
    <div class="cast-list-container">
      <h1 class="cast-list-title">影人</h1>
      <div class="cast-list-wrapper" ref="castWrapper">
        <div class="cast-content" ref="castContent">
          <router-link :to="/celebrity/+item.id" class="cast-list" v-for="(item,index) in movieDetailList.castList" :key="index">
            <img class="cast-list-img" v-lazy="item.imgurl" alt=""/>
            <p class="director-name">{{item.castName}}</p>
            <p>{{item.castTitle}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'detailLonginfo',
  props: {
    movieDetailList: {
      default: {}
    }
  },
  methods: {
    castScroll () {
      this.scroll = new BScroll(this.$refs.castWrapper, {
        scrollX: true,
        eventPassthrough: 'vertical'
      })
    },
    setContentWidth () {
      let castList = this.movieDetailList.castList
      let width = 1.8
      let margin = 0.08
      let sumWidth = (width + margin) * castList.length - margin
      let contentEl = this.$refs.castContent
      contentEl.style.width = sumWidth + 'rem'
    }
  },
  watch: {
    movieDetailList () {
      this.setContentWidth()
    }
  },
  mounted () {
    this.castScroll()
  }
}
</script>

<style lang="stylus" scoped>
  .border-top
    &:before
      border-color: #999
  .long-info
    margin-top: .4rem
    padding-top: .4rem
    h1
      font-size: .24rem
      color: #777
    p
      padding-top: .2rem
      font-size: .28rem
      color: #333
      line-height: .5rem
  .cast-list-container
    padding: .6rem 0
    .cast-list-title
      font-size: .24rem
      padding-bottom: .4rem
      color: #777
    .cast-list-wrapper
      position: relative
      overflow: hidden
      .cast-content
        white-space: nowrap
        .cast-list-img
          height: 2.4rem
          width: 1.8rem
        .cast-list
          display: inline-block
          text-align: center
          color: #777
          margin-right: .16rem
          font-size: .24rem
          vertical-align: top
          .director-name
            color: #000
            text-overflow: ellipsis
            overflow: hidden
            white-space: nowrap
            padding: .16rem 0 .1rem
</style>
