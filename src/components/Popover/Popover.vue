<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport :to="teleportTo" :disabled="!popoverOpen" v-if="popoverOpen">
      <div
        tabindex="0"
        id="tooltip-container"
        class="container"
        @keydown="handleKeyDown"
        :class="position"
        ref="containerRef"
        :style="tooltipPositionStyle"
      >
        <div class="content-container">
          <header v-html="title"> </header>
          <hr />
          <section>
            <slot name="content"></slot>
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
    target: {
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
      if(val) {
        this.getPosition()
        this.addFocus()
      }
    }
  },
  methods: {
    getPosition() {
      if (document.querySelector(`#${this.target}`)) {
        this.$nextTick(() => {
          const tooltipRect = this.$refs?.containerRef.getBoundingClientRect()
          const bodyRect = document.body.getBoundingClientRect()
          const target = document
            .querySelector(`#${this.target}`)
            ?.getBoundingClientRect()

          document.querySelector(`#${this.target}`).style.display =
            'inline-block'
          this.tooltipPositionStyle = tooltipPosition(
            this.position,
            target,
            bodyRect,
            tooltipRect
          )
        })
      } else {
        throw new Error(
          `Could not find element with the id of ${this.target}`
        )
      }
    },
    addFocus() {
      // this.hovered = true
      this.$nextTick(() => {
        this.$refs.containerRef.focus()
        // this.$refs.popUpCloseButton.focus()
      })
    },
    handleKeyDown(evt: Event): void {
      const modalNodes = this.$refs.containerRef.querySelectorAll('*')
      const tabbable = Array.from(modalNodes).filter(
        (n: any) => n.tabIndex >= 0
      )
      let index = tabbable.indexOf(document.activeElement)
      if (evt.key === 'Escape' || evt.key === 'escape') {
        // Pressing the ESC key resets ariaHidden and closes the popover.
        this.close()
      }
       else if (evt.key === 'Tab' || evt.key === 'tab') {
          if(index< tabbable.length -1) {
      //   //set aria hidden on non-popup element
      //   // Pressing the Tab key traps the focus in the modal.
        index += 1
        // index %= tabbable.length
        tabbable[index].focus()
       evt.preventDefault()
          }
      }
    },
    close() {
      this.$emit('update:modelValue', false)
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
