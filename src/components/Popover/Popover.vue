<template>
  <div
    class="container"
    :class="position"
    ref="containerRef"
    :style="tooltipPositionStyle"
  >
    <div class="content-container">
      <header v-html="label"> </header>
      <hr />
      <section v-html="content"> </section>
    </div>
    <div class="arrow"></div>
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
          this.position,
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
