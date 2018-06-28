<template>
  <div>
    <ul class="list" ref="movielist">
      <div class="fixedDate pubdate"
           v-if="!showOnline" ref="dateFixed"
      ></div>
      <router-link :to="/detail/+item.id" tag="li"
        v-for="item in showList"
        :key="item.id"
      >
        <div class="pubdate" v-if="!showOnline && item.dateShow" ref="date">{{item.pubdates}}</div>
        <div class="list-container">
          <div class="list-wrapper">
            <div class="poster-block">
              <img
                v-lazy="item.images"
                alt=""
                class="img-content"
                >
            </div>
            <div class="info">
              <h3 class="movie-name">{{item.title}}</h3>
              <star :score="item.score"></star>
              <p class="info-detail">导演：<span>{{item.directors}}</span></p>
              <p class="info-detail">主演：<span>{{item.casts}}</span></p>
              <p class="seen-count">{{item.collect_count}}人看过</p>
            </div>
          </div>
        </div>
      </router-link>
      <loadmore v-if="isLoading" :hasMoreData="hasMoreData"></loadmore>
    </ul>
  </div>
</template>

<script>
import loadmore from '../../../common/loadmore/loadmore'
import star from '../../../common/star/star'
export default {
  name: 'movieList',
  components: {
    loadmore,
    star
  },
  props: {
    showList: {
      type: Array
    },
    isLoading: {
      type: Boolean
    },
    hasMoreData: {
      type: Boolean
    },
    showOnline: {
      type: Boolean
    },
    nowScrollY: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      dateTop: [],
      dateList: [],
      nowY: 0
    }
  },
  methods: {
    compareDate (date, arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === date) {
          return false
        }
      }
      arr.push(date)
      return true
    },
    groupDate () {
      if (!this.showOnline) {
        let dateArr = []
        this.showList.forEach((item, index) => {
          if (this.compareDate(item.pubdates, dateArr)) {
            this.$set(item, 'dateShow', true)
          } else {
            this.$set(item, 'dateShow', false)
          }
        })
        this.dateList = dateArr
      }
    },
    getHeight () {
      if (!this.showOnline && this.$refs['date']) {
        let dateEleArr = this.$refs['date']
        if (dateEleArr.length !== this.dateTop.length) {
          let arr = []
          for (let i = 0; i < dateEleArr.length; i++) {
            let eleTop = dateEleArr[i].offsetTop
            arr.push(eleTop)
          }
          this.dateTop = arr
          this.dateFixed()
        }
      }
    },
    dateFixed () {
      let fixedEL = this.$refs.dateFixed
      for (let i = 0; i < this.dateTop.length; i++) {
        if (this.dateTop[i] < this.nowY) {
          fixedEL.style.opacity = 1
          fixedEL.innerHTML = this.dateList[i]
          if (this.dateTop[i + 1]) {
            fixedEL.style.top = this.dateTop[i + 1] - 30 > this.nowY ? (this.nowY / 50) + 'rem' : ((this.dateTop[i + 1] - 30) / 50) + 'rem'
          } else {
            fixedEL.style.top = this.nowY / 50 + 'rem'
          }
        }
      }
      if (this.dateTop[0] >= fixedEL.offsetTop) {
        fixedEL.style.opacity = 0
      }
    }
  },
  watch: {
    showList () {
      this.groupDate()
    },
    nowScrollY (newY, oldY) {
      if (!newY) {
        this.nowY = oldY * -1
      } else {
        this.nowY = newY * -1
      }
      if (this.$refs.dateFixed) {
        this.dateFixed()
      }
    }
  },
  updated () {
    this.getHeight()
  }
}
</script>

<style lang="stylus" scoped>
  .list
    padding: 0 .3rem .5rem
    .fixedDate
      position: absolute
      left: .3rem
      right: .3rem
      opacity: 0
    .pubdate
      background: #eee
      padding-left: .1rem
      height: .6rem
      line-height: .6rem
    .list-container
      width: 100%
      .list-wrapper
        padding: .3rem 0
        display: flex
        .poster-block
          flex: 1.6rem 0 0
          .img-content
            width: 1.6rem
            height: 2.4rem
        .info
          display: flex
          flex-direction: column
          justify-content: space-around
          font-size: .24rem
          margin-left: 0.2rem
          color: #777
          overflow: hidden
          .movie-name
             font-size: .32rem
             color: #333
          .info-detail
            text-overflow: ellipsis
            white-space: nowrap
            overflow: hidden
          .seen-count
            color: #666
</style>
