<template>
  <div
    ref="tooltipRef"
    role="tooltip"
    id="tooltip-container"
    :style="positionStyles"
    class="tooltip"
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
    positionStyles(): Object {
      if (this.position == 'top') {
        return {
          top:
            this.parentOffSet.offsetTop - this.parentOffSet.offsetHeight + 'px',
          left: this.parentOffSet.offsetLeft + 'px'
        }
      }

      if (this.position == 'right') {
        return {
          top: this.parentOffSet.offsetTop + 'px',
          left:
            this.parentOffSet.offsetLeft +
            this.parentOffSet.offsetWidth +
            10 +
            'px'
        }
      }

      if (this.position == 'left') {
        return {
          top: this.parentOffSet.offsetTop + 'px',
          left:
            this.parentOffSet.offsetLeft -
            this.parentOffSet.offsetWidth -
            10 +
            'px'
        }
      }

      return {}
    }
  },
  methods: {},
  mounted() {}
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>
