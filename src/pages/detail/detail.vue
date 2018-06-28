<template>
  <div>
    <div class="info-header">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="iconfont camera">&#xe7a2;</span>
      电影
    </div>
    <poster :posterUrl="movieDetailList.images"></poster>
    <div class="info">
      <detail-shortinfo :movieDetailList="movieDetailList"></detail-shortinfo>
      <detail-longinfo :movieDetailList="movieDetailList"></detail-longinfo>
    </div>
    <div class="comment">
      <div class="tabComment border-top">
        <div class="tabCommentBtn"
             @click="handleTabComment"
             ref="tabCommentBtn"
             :class="tabComment?'commentActive':''"
        >短评</div>
        <div class="tabCommentBtn"
             @click="handleTabComment"
             :class="!tabComment?'commentActive':''"
        >影评</div>
      </div>
      <detail-shortcomment v-if="tabComment"
                           :popularComments="popularComments"
                           :commentsCount="commentsCount"
      ></detail-shortcomment>
      <detail-longcomment v-else
                          :popularReviews="popularReviews"
                          :reviewsCount="reviewsCount"
      ></detail-longcomment>
    </div>
  </div>
</template>

<script>
import poster from '../../common/poster/poster'
import detailShortinfo from './components/short-info'
import detailLonginfo from './components/long-info'
import detailShortcomment from './components/shortComment'
import detailLongcomment from './components/long-comment'
import { getMovieDetail } from 'api/movie-detail'
import { handleMovieDetailList } from 'api/movie-list'
export default {
  name: 'movieDetail',
  components: {
    poster,
    detailShortinfo,
    detailLonginfo,
    detailShortcomment,
    detailLongcomment
  },
  data () {
    return {
      tabComment: true,
      movieDetailList: {},
      popularComments: [],
      popularReviews: [],
      commentsCount: 0,
      reviewsCount: 0
    }
  },
  methods: {
    handleTabComment (e) {
      const tabBtn = this.$refs.tabCommentBtn
      if (e.target === tabBtn) {
        this.tabComment = true
      } else {
        this.tabComment = false
      }
    },
    handleMovieDetail () {
      const id = this.$route.params.id
      getMovieDetail(id).then((res) => {
        this.movieDetailList = handleMovieDetailList(res)
        this.popularComments = this.movieDetailList.popular_comments
        this.popularReviews = this.movieDetailList.popular_reviews
        this.commentsCount = this.movieDetailList.comments_count
        this.reviewsCount = this.movieDetailList.reviews_count
      })
    }
  },
  mounted () {
    this.handleMovieDetail()
  }
}
</script>

<style lang="stylus" scoped>
  .border-top
  &:before
    border-color: #999
  .info-header
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
    .camera
      font-size: .5rem
  .info
    padding: 0 .4rem
    background: #fff
  .comment
    background: #fff
    padding: 0 .4rem
    .tabComment
      display: flex
      padding: .4rem 0 0
      .commentActive
        border-bottom: .02rem solid #42bd56
        color: #42bd56 !important
      .tabCommentBtn
        padding: .3rem
        text-align: center
        font-size: .32rem
        color: #777
        box-sizing: border-box
        flex: 1
</style>
