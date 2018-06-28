<template>
  <div id="app">
    <keep-alive include="home,rank">
      <router-view></router-view>
    </keep-alive>
    <tab v-show="bottomTabShow"></tab>
  </div>
</template>

<script>
import tab from './common/tab/tab'
export default {
  name: 'App',
  data () {
    return {
      bottomTabShow: true
    }
  },
  components: {
    tab
  },
  methods: {
    bottomTabShowFn () {
      const id = this.$route.params.id
      const celebrityID = this.$route.params.celebrityID
      if (!id && !celebrityID) {
        this.bottomTabShow = true
      } else {
        this.bottomTabShow = false
      }
    }
  },
  mounted () {
    this.bottomTabShowFn()
  },
  updated () {
    this.bottomTabShowFn()
  }
}
</script>

<style>

</style>
