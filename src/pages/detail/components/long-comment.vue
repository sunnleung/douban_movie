<template>
  <div>
    <ul class="long-commentList">
      <router-link :to="{path: 'review/'+item.id}" append tag="li" class="comment-item" v-for="item in popularReviews" :key="item.id">
        <h1 class="comment-title">{{item.title}}</h1>
        <div class="user-info">
          <img :src="item.author.avatar" alt=""/>
          <span class="user-name">{{item.author.name}}</span>
          <div class="star"><star :score="item.rating.value * 2" :showScoreNum="showScoreNum"></star></div>
        </div>
        <p class="desc">{{item.summary}}</p>
      </router-link>
      <router-link :to="{path: 'review'}" append tag="div" class="all-long-comment">全部影评{{reviewsCount}}个</router-link>
    </ul>
  </div>
</template>

<script>
import star from '../../../common/star/star'
export default {
  name: 'longComment',
  props: {
    popularReviews: {
      type: Array,
      default: function () {
        return []
      }
    },
    reviewsCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      score: 8,
      showScoreNum: false
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" scoped>
  .long-commentList
    padding: .4rem 0
    .comment-item
      margin-bottom: .4rem
      .comment-title
        padding: .1rem 0
        font-size: .32rem
        color: #333
      .user-info
        padding: .1rem 0
        img
          width: .5rem
          border-radius: 50%
          margin-right: .12rem
        .star
          display: inline-block
      .desc
        line-height: .4rem
        color: #777
        font-size: .24rem
  .all-long-comment
    color: #42bd56
    font-size: .28rem
    text-align: center
    padding-bottom: .2rem
</style>
