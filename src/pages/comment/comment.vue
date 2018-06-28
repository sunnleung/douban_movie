<template>
  <div>
    <div class="header border-bottom">
      <span @click="$router.go(-1)" class="iconfont back">&#xe6d9;</span>
      <span class="title">{{movieName}}的全部短评</span>
      <span class="iconfont towardtop" @click="scrollTop">&#xe8f3;</span>
    </div>
    <div class="commentWrapper" ref="commentWrapper">
      <ul class="comment">
        <h1>短评{{total}}条</h1>
        <li class="comment-item" v-for="item in commentList" :key="item.id">
          <div class="userImg-block">
            <img class="userImg" :src="item.author.avatar" alt=""/>
          </div>
          <div class="comment-item-right">
            <div class="right-item-top">
              <span class="userID">{{item.author.name}}</span>
              <star :score="item.rating.value * 2" :showScoreNum="showScoreNum"></star>
              <div class="like">
                <span class="iconfont">&#xe601;</span>
                {{item.useful_count}}
              </div>
            </div>
            <p class="comment-content">{{item.content}}</p>
            <p class="time">{{item.created_at}}</p>
          </div>
        </li>
        <loadmore v-if="isLoading" :hasMoreData="hasMoreData"></loadmore>
      </ul>
    </div>
  </div>
</template>

<script>
import star from '../../common/star/star'
import loadmore from '../../common/loadmore/loadmore'
import BScroll from 'better-scroll'
import { getComment } from 'api/movie-detail'
export default {
  name: 'comment',
  data () {
    return {
      score: 7,
      showScoreNum: false,
      commentList: [],
      movieName: '',
      total: 0,
      start: 0,
      count: 20,
      isLoading: false,
      hasMoreData: true
    }
  },
  components: {
    star,
    loadmore
  },
  methods: {
    handleScroll () {
      this.scroll = new BScroll(this.$refs.commentWrapper)
      this.scroll.on('scrollEnd', (pos) => {
        if (pos.y <= this.scroll.maxScrollY + 40) {
          this.loadMoreFn()
        }
      })
    },
    scrollTop () {
      this.scroll.scrollTo(0, 0, 500)
    },
    handleGetComment (start, count) {
      this.isLoading = true
      const id = this.$route.params.id
      getComment(id, start, count).then((res) => {
        this.commentList = this.commentList.concat(res.comments)
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
      this.handleGetComment(this.start, this.count)
    }
  },
  mounted () {
    this.handleScroll()
    this.handleGetComment(this.start, this.count)
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
      .comment-item
        display: flex
        margin-bottom: .4rem
        .userImg-block
          margin-right:.24rem
          flex: .72rem 0 0
          .userImg
            width: .72rem
            border-radius: 50%
        .comment-item-right
          flex: 1
          display: flex
          flex-direction: column
          .right-item-top
            position: relative
            .userID
              line-height: .5rem
              margin-right: .1rem
            .like
              position: absolute
              right: .1rem
              top: .1rem
              color: #777
              span
                font-size: .24rem
          .comment-content
            line-height: .4rem
          .time
            font-size: .24rem
            color: #777
            line-height: .5rem
</style>
