<template>
  <div
    class="container"
    :class="position"
    ref="containerRef"
    :style="tooltipPositionStyle"
  >
    <div class="content-container">
      <header> Label</header>
      <hr />
      <section>
        And here’s some amazing content. It’s very engaging. Right?
      </section>
    </div>
    <div class="arrow" ref="arrowRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tooltipPosition } from '../../directives/getPosition'
export default defineComponent({
  name: 'Popover',
  props: {
    currentElRect: {
      type: Object,
      default: () => {}
    },
    content: {
      type: String,
      default: () => ''
    },
    position: {
      type: String,
      default: () => 'top'
    },
    label: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      tooltipPositionStyle: {}
    }
  },
  methods: {
    getPosition() {
      this.$nextTick(() => {
        const tooltipRect = this.$refs.containerRef.getBoundingClientRect()
        const bodyRect = document.body.getBoundingClientRect()

        this.tooltipPositionStyle = tooltipPosition(
          'top',
          this.currentElRect,
          bodyRect,
          tooltipRect
        )
      })
    }
  },
  mounted() {
    this.getPosition()
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
