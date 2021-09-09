<template>
  <div
    ref="tooltipRef"
    role="tooltip"
    id="tooltip-container"
    class="tooltip"
    :style="allPositions"
    :class="position"
  >
    <div class="tooltip-content" v-html="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Tooltip',
  props: {
    content: {
      type: String,
      default: () => 'text'
    },
    position: {
      type: String,
      default: () => 'top'
    },
    parentOffSet: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tooltipRef: null
    }
  },
  computed: {
    allPositions(): Object {
      if (this.position == 'top') {
        return this.parentOffSet.top
      }

      if (this.position == 'right') {
        return this.parentOffSet.right
      }

      if (this.position == 'bottom') {
        return this.parentOffSet.bottom
      }

      if (this.position == 'left') {
        return this.parentOffSet.left
      }

      return {}
    }
  },
  methods: {},
  mounted() {
    console.log(this.parentOffSet)
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>
