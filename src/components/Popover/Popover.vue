<template>
  <div
    id="tooltip-container"
    class="container"
    :class="position"
    ref="containerRef"
    :style="tooltipPositionStyle"
  >
    <div class="content-container">
      <header v-html="title"> </header>
      <!-- <header>
        <span
          ><i class="pi pi-Calendar pi-sm" /> Flow Run Activity</span
        ></header
      > -->
      <hr />
      <section>
        <slot>content</slot>
      </section>
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
      type: [Object, String],
      default: () => {}
    },
    position: {
      type: String,
      default: () => 'top'
    },
    title: {
      type: String,
      default: () => 'title'
    }
  },
  data() {
    return {
      tooltipPositionStyle: {}
    }
  },
  methods: {
    getPosition() {
      if (document.querySelector(`#${this.currentElRect}`)) {
        this.$nextTick(() => {
          const tooltipRect = this.$refs.containerRef.getBoundingClientRect()
          const bodyRect = document.body.getBoundingClientRect()
          const currentElRect = document
            .querySelector(`#${this.currentElRect}`)
            ?.getBoundingClientRect()

          document.querySelector(`#${this.currentElRect}`).style.display =
            'inline-block'
          this.tooltipPositionStyle = tooltipPosition(
            this.position,
            currentElRect,
            bodyRect,
            tooltipRect
          )
        })
      } else {
        throw new Error(
          `Could not find element with the id of ${this.currentElRect}`
        )
      }
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
