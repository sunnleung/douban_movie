<template>
  <div>
    <home-header></home-header>
    <onshow-list></onshow-list>
  </div>
</template>

<script>
import HomeHeader from '@/pages/home/components/header'
import onshowList from '@/pages/home/components/onshowList'
export default {
  name: 'home',
  components: {
    HomeHeader,
    onshowList
  }
}
</script>

<style lang="stylus" scoped>

</style>
