<template>
  <div>
    <search-input @checkInputOrNot="handleInput"></search-input>
    <search-category @tagClick="sendTagSearch"></search-category>
    <search-history></search-history>
    <search-list v-show="searchText.length"></search-list>
    <tag-search
      v-if="tagSearchShow"
      @sendCloseTagSearch="closeTagSearch"
      :tagSearchText="tagSearchText"
    ></tag-search>
  </div>
</template>

<script>
import searchInput from './components/input'
import searchCategory from './components/category'
import searchHistory from './components/history'
import searchList from './components/list'
import tagSearch from './components/tag-search'
export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      tagSearchShow: false,
      tagSearchText: ''
    }
  },
  components: {
    searchInput,
    searchCategory,
    searchHistory,
    searchList,
    tagSearch
  },
  methods: {
    handleInput (innerText) {
      this.searchText = innerText
    },
    sendTagSearch (tag) {
      this.tagSearchShow = true
      this.tagSearchText = tag
    },
    closeTagSearch () {
      this.tagSearchShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
