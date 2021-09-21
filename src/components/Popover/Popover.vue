<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport :to="teleportTo">
      <div
        tabindex="0"
        @blur="handleBlur"
        v-if="open"
        :disabled="!open"
        id="tooltip-container"
        class="container"
        @keydown="handleKeyDown"
        :class="position"
        ref="containerRef"
        :style="tooltipPositionStyle"
      >
        <div class="content-container">
          <header v-html="title"> </header>
          <hr class="break"/>
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
      tooltipPositionStyle: {},
      previouslyFocused: null as HTMLDivElement|null,
      tabbable: []
    }
  },
  emits: ['update:modelValue'],
  computed: {
    open(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    },
    activator(): HTMLDivElement|null {
      return document.querySelector(`#${this.target}`)
    }
  },
  watch: {
    open(val) {
      if (val) {
        this.setPreviouslyFocussed()
        this.setTabbable()
        this.getPosition()
      }
    }
  },
  methods: {
    setPreviouslyFocussed() {
      this.previouslyFocused =
      typeof document !== "undefined"
        ? document.activeElement === document.body || document.querySelector(`#${this.target}`)
          ? document.querySelector(`#${this.target}`)
          : null
        : document.activeElement
    },
    setTabbable() {
      setTimeout(()=> {
         const modalNodes = this.$refs.containerRef.querySelectorAll('*')
      this.tabbable = Array.from(modalNodes).filter(
        (n: any) => n.tabIndex >= 0
      )
      this.tabbable.forEach(n => {
        n.addEventListener('blur', (e: Event)=> this.handleBlur(e))
      })
         },200)
    },
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
          this.addFocus()
        })
      } else {
        throw new Error(`Could not find element with the id of ${this.target}`)
      }
    },
    addFocus() {
      this.$nextTick(() => {
        this.$refs.containerRef.focus()
      //   const modalNodes = this.$refs.containerRef.querySelectorAll('*')
      // const tabbable = Array.from(modalNodes).filter(
      //   (n: any) => n.tabIndex >= 0
      // )
      // if(tabbable.length>0) tabbable[0].focus()
      })
      // this.$nextTick(() => {

      //   //this.$refs.containerRef.children[0].focus()  -> contentContainer
      //   this.$refs.containerRef.focus()
      //   // this.$refs.popUpCloseButton.focus()
      // })
    },
    handleKeyDown(evt: Event): void {
      let index = this.tabbable.indexOf(document.activeElement)
      if (evt.key.toLowerCase() === 'escape') {
        // Pressing the ESC key resets ariaHidden and closes the popover.
        this.close()
      } else if (evt.key.toLowerCase() === 'tab') {
        if (index < this.tabbable.length - 1) {
          //set aria hidden on non-popup element
          // Pressing the Tab key traps the focus in the modal.
          index += 1
          // index %= tabbable.length
          this.tabbable[index].focus()
          evt.preventDefault()
        } else this.previouslyFocused.focus()
      }
    },
    handleBlur(e:Event) {
      const target = e.relatedTarget as HTMLDivElement
      if (!this.tabbable.includes(target) && this.open) {
        this.close()
      }
    },
    close() {
      this.$emit('update:modelValue', false)
      this.previouslyFocused.focus()
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
