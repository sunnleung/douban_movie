<template>
  <div>
    <div class="input-container">
      <div class="input">
        <span class="iconfont searchicon">&#xe627;</span>
        <input class="inputarea"
               type="text"
               placeholder="搜索电影/影人"
               v-model="searchText"
        />
      </div>
      <router-link to="/" tag="div" class="input-cancel">取消</router-link>
    </div>
  </div>
</template>

<script>
import bus from 'api/bus'
export default {
  name: 'searchInput',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    sendInputTextBus () {
      bus.$emit('inputListener', this.searchText)
    },
    checkInput () {
      this.$emit('checkInputOrNot', this.searchText)
    },
    acceptHistorySearch () {
      bus.$on('historySearch', (historyText) => {
        this.searchText = historyText
      })
    }
  },
  mounted () {
    this.acceptHistorySearch()
  },
  watch: {
    searchText () {
      this.sendInputTextBus()
      this.checkInput()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .input-container
    height: .6rem
    display: flex
    background: #42bd56
    padding: .2rem 0 .2rem .4rem
    .input-cancel
      height: .6rem
      width: 1.16rem
      text-align: center
      font-size: .3rem
      line-height: .6rem
      color: #fff
    .input
      background: #fff
      flex: 1
      border-radius: .1rem
      display: flex
      padding-left: .1rem
      line-height: .6rem
      .searchicon
        font-size: .28rem
        margin-right: .04rem
      .inputarea
        flex: 1
        border-radius: .1rem
</style>
