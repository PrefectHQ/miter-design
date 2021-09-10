<template>
  <div
    ref="tooltipRef"
    role="tooltip"
    id="tooltip-container"
    class="tooltip"
    :class="position"
    :style="tooltipRefStyle"
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
    currentElRect: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tooltipRefStyle: {}
    }
  },
  computed: {},
  methods: {
    calculatePosition() {
      if (!this.currentElRect && !this.$refs.tooltipRef) return {}

      const tooltipRefRect = this.$refs.tooltipRef.getBoundingClientRect()
      const bodyRect = document.body.getBoundingClientRect()

      if (this.position == 'top') {
        return {
          top:
            this.currentElRect.top -
            bodyRect.top -
            this.currentElRect.height +
            'px',
          left:
            this.currentElRect.left -
            bodyRect.left +
            this.currentElRect.width / 2 -
            tooltipRefRect.width / 2 +
            'px'
        }
      }

      if (this.position == 'right') {
        return {
          top:
            this.currentElRect.top -
            bodyRect.top +
            this.currentElRect.height / 2 -
            tooltipRefRect.height / 2 +
            'px',
          left:
            this.currentElRect.left -
            bodyRect.left +
            this.currentElRect.width +
            'px'
        }
      }

      if (this.position == 'bottom') {
        return {
          top:
            this.currentElRect.top -
            bodyRect.top +
            this.currentElRect.height +
            'px',
          left:
            this.currentElRect.left -
            bodyRect.left +
            this.currentElRect.width / 2 -
            tooltipRefRect.width / 2 +
            'px'
        }
      }

      if (this.position == 'left') {
        return {
          top:
            this.currentElRect.top -
            bodyRect.top +
            this.currentElRect.height / 2 -
            tooltipRefRect.height / 2 +
            'px',
          left:
            this.currentElRect.left -
            bodyRect.left -
            this.currentElRect.width +
            'px'
        }
      }
    }
  },
  mounted() {
    this.tooltipRefStyle = this.calculatePosition()
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>
