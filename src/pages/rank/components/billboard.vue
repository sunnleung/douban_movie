<template>
  <div class="rank-item" :style="'background: linear-gradient('+billboardList.bgLinearColor[0]+','+billboardList.bgLinearColor[1]+')'">
    <div class="desc">
      <h2>{{billboardList.boardDesc}}</h2>
      <span>{{billboardList.secDesc}}</span>
    </div>
    <div class="rank-img">
      <img :src="item" v-for="(item, index) in billboardList.imgGroup" :key="index" :class="{'middle' : index === 0, 'left' : index === 1}" alt=""/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'billboard',
  props: {
    bgLinearColor: {
      type: Array,
      default: () => {
        return ['#e1a708', '#efd491']
      }
    },
    billboardList: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .rank-item
    margin-top: .3rem
    height: 2.6rem
    border-radius: .2rem
    color: #fff
    .desc
      vertical-align: top;
      box-sizing: border-box;
      padding-top: 1rem;
      display: inline-block
      height: 100%
      width: 40%
      text-align: center
      font-size: .32rem
      span
        font-size: .24rem
    .rank-img
      display: inline-block
      width: 55%
      height: 100%
      text-align: center
      img
        position: relative
        top: 50%
        transform: translateY(-50%)
        width: 30%
        vertical-align: text-top
      .middle
        width: 35%
        left: 30%
      .left
        left: -35%
</style>
