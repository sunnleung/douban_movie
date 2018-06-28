<template>
  <div class="user-center">
    <div class="header">
      <div class="avatar">
        <img src="../../assets/avatar.jpg" alt=""/>
      </div>
      <div class="name">豆瓣用户</div>
    </div>
    <switches :switches="switches" class="switch" @switch="switchTab"></switches>
    <div class="movie-num">{{showList.length}} {{nowIndex===2?'人':'部'}}</div>
    <div class="userList-wrapper" ref="userListWrapper">
      <ul>
        <li class="user-moveList" v-for="item in showList" :key="item.id" @click="userClick(item.id)">
          <div class="poster">
            <img v-lazy="item.images"
                 alt=""/>
          </div>
          <div class="info">
            <span class="movie-name" v-text="nowIndex===2?item.name:item.title"></span>
            <star :score="item.score" v-if="nowIndex!==2"></star>
            <span v-if="nowIndex!==2">{{'导演：'+item.title}}</span>
            <span v-if="nowIndex!==2">{{'主演：'+item.casts}}</span>
            <p v-if="nowIndex===2">{{'代表作：'+item.productions}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import switches from '../../common/switches/switches'
import star from '../../common/star/star'
import BScroll from 'better-scroll'
import { mapGetters } from 'vuex'
export default {
  name: 'user',
  data () {
    return {
      nowIndex: 0,
      switches: ['想看', '看过', '影人'],
      showList: []
    }
  },
  computed: {
    ...mapGetters([
      'wantedMovies',
      'watchedMovies',
      'celebrities'
    ])
  },
  methods: {
    userClick (itemId) {
      if (this.nowIndex === 2) {
        this.$router.push('/celebrity/' + itemId)
      } else {
        this.$router.push('/detail/' + itemId)
      }
    },
    switchTab (index) {
      this.nowIndex = index
      switch (index) {
        case 0:
          this.showList = this.wantedMovies
          break
        case 1:
          this.showList = this.watchedMovies
          break
        case 2:
          this.showList = this.celebrities
          break
      }
    },
    handleUserScroll () {
      this.scroll = new BScroll(this.$refs.userListWrapper, {
        click: true
      })
    }
  },
  mounted () {
    this.showList = this.wantedMovies
  },
  updated () {
    this.handleUserScroll()
  },
  components: {
    switches,
    star
  }
}
</script>

<style lang="stylus" scoped>
  .user-center
    background: #f8f8f8
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 1.2rem
  .header
    background: linear-gradient(#42bd56, #9ad57f)
    padding: .7rem 1rem .7rem .4rem
    display: flex
    align-items: center
    height: 3rem
    box-sizing: border-box
    .avatar
      margin-right: .4rem
      img
        width: 1.2rem
        height: 1.2rem
        border-radius: 50%
    .name
      color: #fff
      font-size: .32rem
  .switch
    background: #fff
  .movie-num
    height: .8rem
    line-height: .8rem
    padding: 0 .4rem
    font-size: .28rem
    color: #777
  .userList-wrapper
    position: absolute
    top: 4.7rem
    left: 0
    right: 0
    bottom: 1.2rem
    overflow: hidden
    .user-moveList
      padding: .3rem
      display: flex
      background: #fff
      margin-bottom: .6rem
      .poster
        margin-right: .2rem
        img
          width: 1.4rem
          height: 2rem
      .info
        display: flex
        flex-direction: column
        justify-content: space-around
        overflow: hidden
        padding-bottom: .4rem
        font-size: .24rem
        color: #777
        .movie-name
          font-size: .3rem
          color: #333
        span
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
</style>
