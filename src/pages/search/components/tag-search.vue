<template>
  <div class="tag-search">
    <div class="header border-bottom">
      <span class="iconfont back" @click="handleCloseTagSearch">&#xe6d9;</span>
      <span class="title">关于{{tagSearchText}}的电影</span>
      <span class="iconfont towardtop" @click="scrollTop">&#xe8f3;</span>
    </div>
    <div class="tag-search-item-wrapper" ref="tagSearchWrapper">
      <ul class="tag-search-item-container">
        <router-link
          tag="li"
          class="tag-search-item"
          v-for="item in tagSearchList"
          :key="item.id"
          :to="/detail/+item.id"
        >
          <div class="tag-search-poster-block">
            <img :src="item.images" alt=""/>
          </div>
          <div class="tag-search-item-info">
            <h3 class="tag-search-item-info-title">{{item.title}}</h3>
            <span>{{item.score}}</span>
          </div>
        </router-link>
        <loadmore v-if="tagSearchIsLoading" :hasMoreData="tagSearchHasMoreData"></loadmore>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { tagSearch } from 'api/movie-search'
import { handleTagSearch } from 'api/movie-list'
import loadmore from '../../../common/loadmore/loadmore'
export default {
  name: 'tagSearch',
  props: {
    tagSearchText: {
      type: String
    }
  },
  data () {
    return {
      tagSearchList: [],
      tagSearchStart: 0,
      tagSearchCount: 20,
      tagSearchIsLoading: false,
      tagSearchHasMoreData: true
    }
  },
  methods: {
    handleTagSearchScroll () {
      this.scroll = new BScroll(this.$refs.tagSearchWrapper, {
        click: true,
        probeType: 3
      })
      this.scroll.on('scroll', (pos) => {
        if (pos.y <= this.scroll.maxScrollY + 40) {
          this.tagSearchLoadmoreFn()
        }
      })
    },
    scrollTop () {
      this.scroll.scrollTo(0, 0, 500)
    },
    handleCloseTagSearch () {
      this.$emit('sendCloseTagSearch')
    },
    handleGetTagSearch () {
      this.tagSearchIsLoading = true
      tagSearch(this.tagSearchText, this.tagSearchStart, this.tagSearchCount).then((res) => {
        this.tagSearchList = this.tagSearchList.concat(handleTagSearch(res.subjects))
        const total = res.total
        this.tagSearchStart += this.tagSearchCount
        if (this.tagSearchStart >= total) {
          this.tagSearchHasMoreData = false
        } else {
          this.tagSearchIsLoading = false
        }
      })
    },
    tagSearchLoadmoreFn () {
      if (this.tagSearchIsLoading) {
        return
      }
      this.handleGetTagSearch()
    }
  },
  created () {
    this.handleGetTagSearch()
  },
  mounted () {
    this.handleTagSearchScroll()
  },
  components: {
    loadmore
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
  &:before
    border-color: #999
  .tag-search
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 98
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
        color: #333
      .towardtop
        position: absolute
        right: .12rem
        padding: .3rem
        color: #42bd56
        font-size: .4rem
    .tag-search-item-wrapper
      position: absolute
      top: 1rem
      left: 0
      right: 0
      bottom: 0
      overflow: hidden
    .tag-search-item-container
      padding: .3rem .3rem .5rem
      .tag-search-item
        display: flex
        margin-bottom: .3rem
        .tag-search-poster-block
          flex: 1rem 0 0
          margin-right: .2rem
          img
            width: 1rem
            height: 1.4rem
        .tag-search-item-info
          padding-bottom: .6rem
          color: #777
          font-size: .2rem
          .tag-search-item-info-title
            font-size: .28rem
            margin-bottom: .2rem
            color: #333
</style>
