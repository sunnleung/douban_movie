<template>
  <div>
    <div class="poster-block">
      <img class="poster"
           :src="posterUrl"
           alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detailPoster',
  props: {
    posterUrl: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .poster-block
    text-align: center
    width: 100%
    height: 0
    padding-bottom:89.6%
    background: #555
    .poster
      width: 50%
      margin-top: 1rem
</style>
