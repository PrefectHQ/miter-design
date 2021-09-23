<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport v-if="open" :to="teleportTo">
      <!-- PopoverContent to enable testing -->
      <PopoverContent>
        <template v-slot>
          <div
            tabindex="0"
            @blur="handleBlur"
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
              <hr class="break" />
              <section>
                <slot></slot>
              </section>
            </div>
            <div class="arrow"></div>
          </div>
        </template>
      </PopoverContent>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopoverContent from './PopoverContent.vue'
import { tooltipPosition } from './getPosition'

interface tooltipPositionStyleObject {
  left?: string | undefined
  top?: string | undefined
}

export default defineComponent({
  name: 'Popover',
  components: {
    PopoverContent
  },
  props: {
    target: {
      type: String,
      required: true
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
      tooltipPositionStyle: {} as tooltipPositionStyleObject | undefined,
      previouslyFocused: null as HTMLDivElement | null,
      tabbable: [] as Element[]
    }
  },
  emits: ['update:modelValue'],
  computed: {
    open(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  mounted() {
    setTimeout(() => {
      const activator: HTMLElement | null = document.getElementById(this.target)
      if (activator) activator.tabIndex = 0
    }, 200)
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
      if (typeof document !== 'undefined')
        this.previouslyFocused =
          document.activeElement === document.body ||
          document.querySelector(`#${this.target}`)
            ? document.querySelector(`#${this.target}`)
            : null
    },
    setTabbable() {
      setTimeout(() => {
        const modalNodes = (
          this.$refs.containerRef as HTMLElement
        ).querySelectorAll('*')
        this.tabbable = Array.from(modalNodes).filter(
          (n: any) => n.tabIndex >= 0
        )
        this.tabbable.forEach((n) => {
          n.addEventListener('blur', (e: Event) => this.handleBlur(e))
        })
      }, 300)
    },
    getPosition() {
      if (document.querySelector(`#${this.target}`)) {
        this.$nextTick(() => {
          const tooltipRect = (
            this.$refs?.containerRef as HTMLElement
          ).getBoundingClientRect()
          const bodyRect = document.body.getBoundingClientRect()
          const target = document
            ?.querySelector(`#${this.target}`)
            ?.getBoundingClientRect()
          const activator: HTMLElement | null = document.getElementById(
            this.target
          )
          if (activator) activator.style.display = 'inline-block'
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
        ;(this.$refs.containerRef as HTMLElement).focus()
      })
    },
    handleKeyDown(evt: KeyboardEvent): void {
      if (document.activeElement) {
        let index: number = this.tabbable.indexOf(document.activeElement)
        if (evt.key.toLowerCase() === 'escape') {
          this.close()
        } else if (evt.key.toLowerCase() === 'tab') {
          if (index < this.tabbable.length - 1) {
            index += 1
            //leading semicolon here so that TS/Vue does not think this line is part of index+=1
            ;(this.tabbable[index] as HTMLElement).focus()
            evt.preventDefault()
          } else this.previouslyFocused?.focus()
        }
      }
    },
    handleBlur(e: MouseEvent) {
      const target = e.relatedTarget as HTMLDivElement
      if (!this.tabbable.includes(target)) {
        this.close()
      }
    },
    close() {
      this.$emit('update:modelValue', false)
      this.previouslyFocused?.focus()
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popover';
</style>
