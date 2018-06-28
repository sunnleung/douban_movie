<template>
  <div>
    <div class="header border-bottom">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="title">影评</span>
    </div>
    <div class="reviewDetailWrapper" ref="reviewDetailWrapper">
      <div class="container">
        <h1>{{reviewDetail.title}}</h1>
        <div class="user-block">
          <div class="userImg-block">
            <img class="userImg" :src="reviewUser.avatar" alt=""/>
          </div>
          <div class="user">
            <h2><span class="username">{{reviewUser.name}}</span>的影评</h2>
            <span>{{reviewDetail.created_at}}</span>
            <star :score="score * 2" :showScoreNum="showScoreNum"></star>
          </div>
        </div>
        <p class="content">{{reviewDetail.content}}</p>
        <div class="bottom">
          <p>
            本文版权归 {{reviewUser.name}} 所有，任何形式转载请联系作者
          </p>
          <div class="endLine">
            <div class="line"></div>
            <span>THE END</span>
          </div>
          <div>
            <span class="userfulBtn userful">有用({{reviewDetail.useful_count}})</span>
            <span class="userfulBtn">没用({{reviewDetail.useless_count}})</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import star from '../../../common/star/star'
import { getSingleReview } from 'api/movie-detail'
export default {
  name: 'reviewDetail',
  data () {
    return {
      reviewDetail: {},
      reviewUser: {},
      showScoreNum: false,
      score: 0
    }
  },
  components: {
    star
  },
  methods: {
    handleReviewDetailScroll () {
      this.scroll = new BScroll(this.$refs.reviewDetailWrapper)
    },
    handleGetReviewDetail () {
      const reviewID = this.$route.params.reviewID
      getSingleReview(reviewID).then((res) => {
        this.reviewDetail = res
        this.reviewUser = res.author
        this.score = res.rating.value
      })
    }
  },
  mounted () {
    this.handleReviewDetailScroll()
    this.handleGetReviewDetail()
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
  .reviewDetailWrapper
    position: absolute
    top: 1rem
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .container
      padding: .4rem .4rem .8rem
      h1
        font-size: .44rem
        color: #333
        line-height: .6rem
      .user-block
        display: flex
        margin-top: .4rem
        .userImg-block
          margin-right: .2rem
          .userImg
            width: .72rem
            border-radius: 50%
        .user
          font-size: .24rem
          color: #777
          h2
            margin-bottom: .1rem
            .username
              padding-right: .1rem
              color: #333
      .content
        margin-top: .6rem
        color: #333
        line-height: .5rem
        white-space: pre-wrap
      .bottom
        margin-top: .8rem
        font-size: .24rem
        text-align: center
        color: #777
        .endLine
          position: relative
          margin: .6rem auto
          width: 60%
          .line
            height: .02rem
            background: #ccc
          span
            position: absolute
            transform: translateX(-50%) translateY(-50%)
            background: #fff
        .userfulBtn
          display: inline-block
          padding: .2rem .3rem
          color: #333
          font-size: .28rem
          border: .02rem solid #ccc
          border-radius: .1rem
        .userful
          margin-right: .2rem
</style>
