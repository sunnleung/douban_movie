<template>
  <div>
    <div class="loadmore">
      <div v-if="hasMoreData">
        <span class="loading-spot"></span>
        <span class="loading-spot"></span>
        <span class="loading-spot"></span>
        <span class="loading-spot"></span>
        <span class="loading-spot"></span>
      </div>
      <div v-else>
        <span>没有更多数据了</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'loadmore',
  props: {
    hasMoreData: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loadmore
    display: flex
    padding: .1rem 0
    justify-content: center
    text-align: center
    .loading-spot
      display: inline-block
      width: .3rem
      height: .3rem
      background: lightgreen
      margin-right: .1rem
      animation: load 1.04s ease infinite
      &:nth-child(1)
        animation-delay: 0.13s
      &:nth-child(2)
        animation-delay: 0.26s
      &:nth-child(3)
        animation-delay: 0.39s
      &:nth-child(4)
        animation-delay: 0.52s
      &:nth-child(5)
        animation-delay: 0.65s
      &:last-child
        margin-right: 0
  @keyframes load
    0%
      opacity: 1
      transform: scale(1.2)

    100%
      opacity: .2;
      transform: scale(.2)
</style>
