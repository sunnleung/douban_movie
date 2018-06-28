<template>
  <div class="bottom border-top">
    <router-link to="/movie-show" tag="div" class="bottomBtn">
      <span class="iconfont bottom-icon">&#xe7a2;</span>
      <span>热映</span>
    </router-link>
    <router-link to="/rank" class="bottomBtn">
      <span class="iconfont bottom-icon">&#xe600;</span>
      <span>排行</span>
    </router-link>
    <router-link to="/user" tag="div" class="bottomBtn">
      <span class="iconfont bottom-icon">&#xe6ee;</span>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
  .border-top
    &:before
      border-color: #42bd56;
    &:after
      border-color: #42bd56;
  .router-link-active
    color: #42bd56 !important
  .bottom
    position: absolute
    height: 1.2rem
    display: flex
    bottom: 0
    left: 0
    right: 0
    background: #fff
    .bottomBtn
      flex: 1
      font-size: .24rem
      color: #777
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      .bottom-icon
        font-size: .44rem
</style>
