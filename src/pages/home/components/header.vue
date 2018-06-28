<template>
  <div>
    <div class="search">
      <div class="logo">
        <img src="../../../assets/logo.png" class="logoImg" alt="">
      </div>
      <router-link to="/search" tag="div" class="searchInput">
        <span class="iconfont">&#xe627;</span>
        <span>电影/影人/标签"</span>
      </router-link>
    </div>
    <ul class="tab-show">
      <li
        :class="this.tabShowNow?'border-bottom':''"
        @click="handleTabShow"
        ref="tabShow"
      >
        正在上映
      </li>
      <li
        :class="!this.tabShowNow?'border-bottom':''"
        @click="handleTabShow"
      >
        即将上映
      </li>
    </ul>
  </div>
</template>

<script>
import bus from 'api/bus'
export default {
  name: 'HomeHeader',
  data () {
    return {
      tabShowNow: true
    }
  },
  methods: {
    handleTabShow (e) {
      const tabEl = this.$refs.tabShow
      if (e.target === tabEl) {
        this.tabShowNow = true
      } else {
        this.tabShowNow = false
      }
      bus.$emit('tabShow', this.tabShowNow)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .border-bottom
  &:before
    color: #42bd56
    border-color: #42bd56
    border-width: .04rem
  .search
    display: flex
    height: .84rem
    padding: .16rem .16rem 0 .26rem
    .logo
      flex: 1
      .logoImg
        width: .7rem
        height: .7rem
    .searchInput
      background: #eee
      font-size: .32rem
      line-height: .7rem
      border-radius: .1rem
      height: .72rem
      width: 6.1rem
      text-align: center
  .tab-show
    display: flex
    font-size: .32rem;
    li
      flex: 1
      text-align: center;
      height: .94rem
      line-height: .94rem
      box-sizing: border-box
</style>
