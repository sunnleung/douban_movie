<template>
  <div>
    <ul class="category-container">
      <li class="category-list border-bottom"
          v-for="(item, category) in categoryList"
          :key="category"
      >
        <div class="category-box border"
             v-for="(tag, index) in item"
             :key="index"
             @click="handleTagClick(tag)"
        >{{tag}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'searchCategory',
  data () {
    return {
      categoryList: {
        doubanTag: ['经典', '豆瓣高分', '冷门佳片'],
        movieTag: ['剧情', '爱情', '喜剧', '科幻', '动作', '悬疑', '治愈', '青春', '文艺'],
        countryTag: ['日本', '韩国']
      }
    }
  },
  methods: {
    handleTagClick (tag) {
      this.$emit('tagClick', tag)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .border
    &:before
      border-radius: .4rem
      border-color: #42bd56
  .border-bottom
    &:before
      border-color: #999
  .category-container
    padding: 0 .3rem
    .category-list
      padding: .4rem 0 .1rem
      .category-box
        display: inline-block
        margin-right: .3rem
        color: #42bd56
        font-size: .28rem
        padding: .16rem .32rem
        margin-bottom: .3rem
</style>
