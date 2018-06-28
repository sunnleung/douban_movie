<template>
  <div class="history-wrapper">
    <div class="history-container">
      <span class="history-title">搜索历史</span>
      <span class="iconfont clear-bin" @click="clearSearch">&#xe66b;</span>
    </div>
    <ul>
      <li
        class="history-list"
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="historySearchAgain(item)"
      >
        <span>{{item}}</span>
        <span class="iconfont" @click.stop="deleteSearch(item)">&#xe639;</span>
      </li>
    </ul>
    <p class="non-history" v-if="!searchHistory.length">还没有搜索历史，快去搜索吧:)</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import bus from 'api/bus'
export default {
  name: 'searchHistory',
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    deleteSearch (searchText) {
      this.deMarkSearchHistory(searchText)
    },
    clearSearch () {
      this.clearAllSearchHistory()
    },
    historySearchAgain (searchText) {
      bus.$emit('historySearch', searchText)
    },
    ...mapActions([
      'deMarkSearchHistory',
      'clearAllSearchHistory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  .history-wrapper
    padding: 0 .3rem
    .history-container
      color: #42bd56
      display: flex
      justify-content: space-between
      font-size: .36rem
      line-height: 1.2rem
      height: 1.2rem
    .non-history
      text-align: center
    .history-list
      display: flex
      justify-content: space-between
      color: #777
      font-size: .28rem
      height: .8rem
      line-height: .8rem
</style>
