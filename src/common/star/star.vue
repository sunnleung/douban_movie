<template>
  <div style="display:inline-block">
    <span
      v-if="score || showEmpty"
      class="star-icon"
      v-for="(item, index) in starCls"
      :key="index"
      :class="item"
    ></span>
    <span v-if="!score" :style="starStyle">暂无评分</span>
    <span v-if="score&&showScoreNum">{{showScore}}</span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    score: {
      type: Number,
      default: 0
    },
    showScoreNum: {
      type: Boolean,
      default: true
    },
    showEmpty: {
      type: Boolean,
      default: false
    },
    starStyle: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    showScore () {
      let scoreStr = this.score.toString()
      if (scoreStr.length < 2) {
        scoreStr = scoreStr + '.0'
      }
      return scoreStr
    },
    starCls () {
      let clsArr = []
      let starNum = this.score / 2
      for (let i = 1; i <= starNum; i++) {
        clsArr.push('onstar')
      }
      let halfStarNum = starNum % 1
      if (halfStarNum >= 0.5) {
        clsArr.push('halfstar')
      }
      for (let i = clsArr.length; i < 5; i++) {
        clsArr.push('offstar')
      }
      return clsArr
    }
  }
}
</script>

<style lang="stylus" scoped>
  .star-icon
    display: inline-block
    margin-right: .06rem
    width: .2rem
    height: .2rem
    background-size: .2rem .2rem
  .offstar
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAeRJREFUOBGtlDsvBFEUx3d2djfiMbTsQ0NEwTaiQSGiRKWREDofgMJHEAqdSPSE0BC9SiEqWQWSzT4SzSbrsR7Fzo7fEXfNg9klbjI5j/s/vzn3MRMI1DFyudxaPp8/qEMa0GqJ0ul0QzgcvtM0zbAsqzMWi+X9aoJ+kzIXiUSmgLXhinZOcn6jJpDieRvA7tvSX64vMJvNdiAdV3I67c5kMkMq/s76AgHMUqTbC0Oh0II9dvvVQ0mlUs2GYbRWKpU2ij4swA3pylX0ZJrmNPn7crn8oOv6Y7FYfEgmk8+i07gOl0z24js6cUHqCU1uwbksefcfYPJCHeDFx5LpUq7DNp2GZeYPw2KrVuLx+Gp1D4GOATwEZvwGSFdv6Oe48PtSVwVKwCfWB/SEJyZxHaMAcBLYmdI6gJIEGg0Gg1e4tTqVZfawzBsFE+u5h4heyLfYRT/4LERrcs95gNwr+RI8nbsLJWa5I+68B8hbPSJ3kYq/03qAvHVYFShL7phni9hSuU/r0TqA8u9DOGArKvCZzXCKEzyL7O8o4Fs1T4ftHGKXisU6gOzfIKLIp2CnVCr1JhKJHVXAiZ4C7Ae8Ts6UPDfCsUUhJRYLrJGCa+xSNBo9ss8pH+gr/jK/tj0a2ETv2IZ35FSkS7HbzakAAAAASUVORK5CYII=")
  .onstar
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzIxRTIyNkM2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzUxNkE4RkU2QjgzMTFFNkFFQjVFRkIyNzZERjNFOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjFFMjI2QTZCODMxMUU2QUVCNUVGQjI3NkRGM0U4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjFFMjI2QjZCODMxMUU2QUVCNUVGQjI3NkRGM0U4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqgV8k8AAAEtSURBVHjaYvw/k4EY4AjE/4H4AIZM2n8ULgsDcSAHSh8gpJAYA+WA2B+J/QifYiYiDMwCYmYoziSkmJCBHECcjMRPgYqRbWAkEIsg8UWgYkSFIQtUgxgQi0PZxVj0lADxDyB+A8QvGWYxvgKz0/7/AUkyApNNN5BOBGJhBsrAWyCeD/JyBRCvYqAcgMyoAHnzLzQm7wNxF5mGlQG93I0eKSCBMGj4EAt+gPVADcMWy6uB2AUaHsSEmQvQsNWEks1RID5FhIGnoGoJpkOQmBURBlpi04/NQG0g5ifCQAGoWoIG2qDxQeXTHCj+jyZnTaqB56FeS4ViEPsCkrwtsQZ+hJaBpkB8EkkOxDaByn0ixoVSQHwQiNWBeCo00aODv1A5NSA+BMzL0siSAAEGAFbSPvm9m4DCAAAAAElFTkSuQmCC")
  .halfstar
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAATCAYAAACQjC21AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjdENENFN0E2Qjg0MTFFNkFFQjVFRkIyNzZERjNFOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjdENENFN0I2Qjg0MTFFNkFFQjVFRkIyNzZERjNFOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyN0Q0Q0U3ODZCODQxMUU2QUVCNUVGQjI3NkRGM0U4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyN0Q0Q0U3OTZCODQxMUU2QUVCNUVGQjI3NkRGM0U4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiYx+oIAAAGzSURBVHjapJPLK0RhGId/c840mebilmbKJbllKNnyB0iKobGxsyLlEhtyWUg2IzYmxYakkAaFspiVomajLJQs2Mj9EiYzMWP8TrnMjOmcw7z19N3OefrO+75HMzk9C6VwYLTRjYE9Ts9jz9pbmqPWWqgIE+67ODzGE8aGoPSAHWM2Ix4qOc0lxoSFlPUBYek5DSlJSFiHcYMZNw0RW8VE/LcwCb5OEUFT1BZQIPfOd1GqMaXTwZ8p4i1LRChLQNCSjOu2OO+UkRAJkBfXzJw0Bljtd+lQcz9tXTDj1s6byCbchdlWhfRJ4mPhBSnNPqR5kHicEK92Db1BThqaMDSRjrPuf8q8/OSDqKIsYqTnCnkdYQhvfxBJufR8yX5VeQVDrkvkO0LQ+lTIpJxtUXYi2zZu9G8EYDxSIbwhl4p9yPYR2X+lKoSWz79HXqjHcwVbSK9CqCOpikI2d1XMVvgJGZsc46XBqijk51b+ZN1weoHCmnk4a7ncIevk7q/CclbZf4uc0TtkF7FI2xHH12SV7JJXRWE9nPl+mPd5K9sShgc/mz42wuSQLJML/suGyMMPAQYAj4R6EIkKIE4AAAAASUVORK5CYII=")
</style>
