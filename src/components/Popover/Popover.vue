<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport :to="teleportTo">
      <div
        v-if="open"
        :disabled="!open"
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
    open(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  watch: {
    open(val) {
      if (val) {
        this.getPosition()
      }
    }
  },
  mounted() {
    console.log('value', this.value)
  },
  methods: {
    getPosition() {
      if (document.querySelector(`#${this.target}`)) {
        this.$nextTick(() => {
          console.log('next tick get pos')
          const tooltipRect = this.$refs?.containerRef.getBoundingClientRect()
          const bodyRect = document.body.getBoundingClientRect()
          const target = document
            .querySelector(`#${this.target}`)
            ?.getBoundingClientRect()

          console.log('currentEL', target)
          document.querySelector(`#${this.target}`).style.display =
            'inline-block'
          this.tooltipPositionStyle = tooltipPosition(
            this.position,
            target,
            bodyRect,
            tooltipRect
          )
          this.addFocus()
        })
      } else {
        throw new Error(`Could not find element with the id of ${this.target}`)
      }
    },
    addFocus() {
      // this.hovered = true
      this.$nextTick(() => {
        this.$refs.containerRef.focus()
      })
      // this.$nextTick(() => {

      //   //this.$refs.containerRef.children[0].focus()  -> contentContainer
      //   this.$refs.containerRef.focus()
      //   // this.$refs.popUpCloseButton.focus()
      // })
    },
    handleKeyDown(evt: Event): void {
      const modalNodes = this.$refs.containerRef.querySelectorAll('*')
      const tabbable = Array.from(modalNodes).filter(
        (n: any) => n.tabIndex >= 0
      )
      let index = tabbable.indexOf(document.activeElement)
      if (evt.key.toLowerCase() === 'escape') {
        // Pressing the ESC key resets ariaHidden and closes the popover.
        this.close()
      } else if (evt.key.toLowerCase() === 'tab') {
        if (index < tabbable.length - 1) {
          //set aria hidden on non-popup element
          // Pressing the Tab key traps the focus in the modal.
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
