<template>
  <div>
    <div class="short-info-block">
      <div class="info-block-top">
        <div class="short-info">
          <h1>{{movieDetailList.title}}</h1>
          <p>{{movieDetailList.yearGenres}}</p>
          <p>{{movieDetailList.original_title}}</p>
          <p>{{movieDetailList.pubdates}}</p>
          <p>{{movieDetailList.durations}}</p>
        </div>
        <div class="rating-block">
          <span class="rating-text">豆瓣评分</span>
          <span class="rating-score" v-if="movieDetailList.score===0?false:true">{{movieDetailList.score}}</span>
          <star :score="score" :showScoreNum="showScoreNum" :showEmpty="true" :starStyle="starStyle"></star>
          <span class="rating-text" v-if="movieDetailList.score===0?false:true">{{movieDetailList.ratings_count}}</span>
        </div>
      </div>
      <div class="info-block-bottom">
        <div class="no-watch-yet" :class="{'wantWatch':wantWatch === true}" @click="tabWantWatch">{{wantWatch?'已想看':'想看'}}</div>
        <div class="watched"
             @click="tabWatch"
             :class="watched?'has-watched':''"
        >
          <img class="confirm-watched"
               src="../../../assets/avatar.jpg"
               alt=""
               v-show="watched"
          />
          {{watched?'已看过':'看过 ☆☆☆☆☆'}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../../../common/star/star'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'imginfo',
  props: {
    movieDetailList: {
      type: Object
    }
  },
  data () {
    return {
      showScoreNum: false,
      starStyle: {
        'display': 'block',
        'padding': '.3rem 0 .2rem'
      }
    }
  },
  computed: {
    score () {
      return this.movieDetailList.score
    },
    collectMovieList () {
      return {
        id: this.movieDetailList.id,
        images: this.movieDetailList.images,
        score: this.movieDetailList.score,
        title: this.movieDetailList.title,
        director: this.movieDetailList.directors,
        casts: this.movieDetailList.casts
      }
    },
    ...mapGetters([
      'wantedMovies',
      'watchedMovies'
    ]),
    wantWatch () {
      const index = this.wantedMovies.findIndex((item) => {
        return item.id === this.collectMovieList.id
      })
      if (index > -1) {
        return true
      }
      return false
    },
    watched () {
      const index = this.watchedMovies.findIndex((item) => {
        return item.id === this.collectMovieList.id
      })
      if (index > -1) {
        return true
      }
      return false
    }
  },
  components: {
    star
  },
  methods: {
    tabWatch () {
      this.markWatchedMovie(this.collectMovieList)
    },
    tabWantWatch () {
      this.markWantedMovie(this.collectMovieList)
    },
    ...mapActions([
      'markWantedMovie',
      'markWatchedMovie'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .short-info-block
    display: flex
    flex-direction: column
    .info-block-top
      display: flex
      justify-content: space-between
      h1
        font-size: .34rem
        color: #333
        line-height: .8rem
      p
        font-size: .24rem
        line-height: .44rem
        color: #777
    .rating-block
      height: 1.4rem
      margin-top: .3rem
      display: flex
      flex-direction: column
      padding: .2rem .3rem
      align-items: center
      justify-content: space-between
      box-shadow: 0 0 .1rem #ccc
      background-color: #f8f8f8
      .rating-text
        font-size: .24rem
        color: #777
      .rating-score
        font-size: .36rem
        color: #333
    .info-block-bottom
      margin-top: .4rem
      line-height: .7rem
      height: .7rem
      color: #42bd56
      text-align: center
      display: flex
      div
        border: .02rem solid #42bd56
        border-radius: .1rem
      .no-watch-yet
        flex: 1
      .wantWatch
        color: #fe9800
        border-color: #fe9800
      .watched
        flex: 2
        margin-left: .4rem
        .confirm-watched
          width: .5rem
          height:.5rem
      .has-watched
        border: .02rem solid #fe9800
        color: #fe9800
</style>
