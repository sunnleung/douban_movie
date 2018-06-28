<template>
  <div>
    <div class="header border-bottom">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="title">{{movieName}}的全部影评</span>
      <span class="iconfont towardtop" @click="scrollTop">&#xe8f3;</span>
    </div>
    <div class="commentWrapper" ref="commentWrapper">
      <ul class="comment">
        <h1>影评{{total}}条</h1>
        <router-link :to="{path: item.id}" append
                     class="comment-item"
                     v-for="item in reviewsList"
                     :key="item.id"
        >
          <h2>{{item.title}}</h2>
          <div class="user-block">
            <div class="userImg-block">
              <img class="userImg" :src="item.author.avatar" alt=""/>
            </div>
            <span class="userID">{{item.author.name}}</span>
            <star :score="item.rating.value * 2" :showScoreNum="showScoreNum"></star>
          </div>
          <p class="comment-content">{{item.summary}}</p>
        </router-link>
        <loadmore v-if="isLoading" :hasMoreData="hasMoreData"></loadmore>
      </ul>
    </div>
  </div>
</template>

<script>
import star from '../../common/star/star'
import loadmore from '../../common/loadmore/loadmore'
import BScroll from 'better-scroll'
import { getReview } from 'api/movie-detail'
export default {
  name: 'reviews',
  data () {
    return {
      score: 7,
      showScoreNum: false,
      start: 0,
      count: 20,
      movieName: '',
      total: 0,
      reviewsList: [],
      isLoading: false,
      hasMoreData: true
    }
  },
  components: {
    star,
    loadmore
  },
  methods: {
    handleGetReview (start, count) {
      const id = this.$route.params.id
      this.isLoading = true
      getReview(id, start, count).then((res) => {
        this.reviewsList = this.reviewsList.concat(res.reviews)
        this.movieName = this.movieName.length ? this.movieName : res.subject.title
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
    loadMoreFn () {
      if (this.isLoading) {
        return
      }
      this.handleGetReview(this.start, this.count)
    },
    handleScroll () {
      this.scroll = new BScroll(this.$refs.commentWrapper, {
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
    this.handleGetReview(this.start, this.count)
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
  .commentWrapper
    position: absolute
    top: 1rem
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .comment
      padding: .4rem .4rem .6rem
      h1
        font-size: .28rem
        margin-bottom: .3rem
        color: #777
    .comment-item
      display: flex
      margin-bottom: .4rem
      flex-direction: column
      h2
        font-size: .32rem
        color: #333
        padding: .1rem 0
      .user-block
        display: flex
        align-items: center
        color: #777
        padding: .1rem 0
        font-size: .24rem
        .userImg-block
          margin-right:.12rem
          flex: .5rem 0 0
          .userImg
            width: .5rem
            border-radius: 50%
        .userID
          line-height: .5rem
          margin-right: .1rem
      .comment-content
        color: #777
        font-size: .24rem
        line-height: .4rem
</style>
