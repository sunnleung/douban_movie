<template>
  <div>
    <div class="switches">
      <div
        class="switches-item"
        v-for="(item, index) in switches"
        :key="index"
        :class="{'active':currentIndex === index, 'small-font':smallFont === true}"
        @click="switchItem(index)"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'switches',
  props: {
    switches: {
      type: Array,
      default: () => {
        return []
      }
    },
    smallFont: {
      type: Boolean,
      default: false
    },
    propIndex: {
      default: null
    }
  },
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    switchItem (index) {
      this.$emit('switch', index)
      this.currentIndex = index
    }
  },
  watch: {
    propIndex () {
      this.currentIndex = this.propIndex
    }
  }
}
</script>

<style lang="stylus" scoped>
  .switches
    display: flex
    .switches-item
      flex: 1
      color: #777
      text-align: center
      padding: .3rem
      font-size: .3rem
      box-sizing: border-box
      &.active
        color: #42bd56
        border-bottom: 1px solid #42bd56
      &.small-font
        padding: .28rem .1rem
        font-size: .24rem
</style>
