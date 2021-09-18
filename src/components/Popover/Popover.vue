<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport :to="teleportTo" :disabled="!popoverOpen" v-if="popoverOpen">
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
        <slot name=content></slot>
      </section>
    </div>
    <div class="arrow"></div>
  </div>
      
    </teleport>
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
    },
    modelValue: {
      type: Boolean,
      required: false
    },
    teleportTo: {
      type: String,
      required: false,
      default: 'body'
    },
    value: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      tooltipPositionStyle: {}
    }
  },
  emits: ['update:modelValue'],
  computed: {
    popoverOpen(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  watch: {
    popoverOpen(val) {
      if(val) this.getPosition()
    }
  },
  methods: {
    getPosition() {
      if (document.querySelector(`#${this.currentElRect}`)) {
        this.$nextTick(() => {
          const tooltipRect = this.$refs?.containerRef.getBoundingClientRect()
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
    },
    closePopUp() {
      this.$emit('update:modelValue', false)
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
