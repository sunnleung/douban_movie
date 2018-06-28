<template>
  <div>
    <ul class="short-commentList">
      <li class="comment-block" v-for="item in popularComments" :key="item.id">
        <div class="userImg-block">
          <img class="userImg" :src="item.author.avatar" alt=""/>
        </div>
        <div class="comment-content">
          <div>
            <span class="userID">{{item.author.name}}</span>
            <div class="star"><star :score="item.rating.value * 2" :showScoreNum="showScoreNum"></star></div>
          </div>
          <p class="comment">{{item.content}}</p>
          <p class="time">{{item.created_at}}</p>
        </div>
        <div class="like">
          <span class="iconfont likeIcon">&#xe601;</span>
          <span>{{item.useful_count}}</span>
        </div>
      </li>
      <router-link :to="{path: 'comment'}" append tag="div" class="all-short-comment">全部短评{{commentsCount}}个</router-link>
    </ul>
  </div>
</template>

<script>
import star from '../../../common/star/star'
export default {
  name: 'shortComment',
  props: {
    popularComments: {
      type: Array,
      default: function () {
        return []
      }
    },
    commentsCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showScoreNum: false
    }
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" scoped>
  .short-commentList
    padding: .4rem 0
    .comment-block
      display: flex
      position: relative
      margin-bottom: .4rem
      .userImg-block
        margin-right: .24rem
        .userImg
          border-radius: 50%
          width: .72rem
      .comment-content
        flex: 1
        .star
          display: inline-block
        .userID
          line-height: .5rem
          margin-right: .1rem
        .comment
          line-height: .4rem
        .time
          font-size: .24rem
          color: #777
          line-height: .5rem
      .like
        position: absolute
        color: #777
        top: .1rem
        right: .1rem
    .all-short-comment
      color: #42bd56
      font-size: .28rem
      text-align: center
      padding-bottom: .2rem
</style>
