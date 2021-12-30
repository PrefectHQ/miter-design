<template>
  <button
    class="tab"
    :class="classes"
    :disabled="disabled"
    :title="title"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <slot> Tab </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MTab',
  emits: {
    click(e: Event, ...args: any[]) {
      return { e, ...args }
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    disabled: { type: Boolean, default: false },
    href: {
      type: [String, Number]
    }
  },
  data() {
    return {
      focused: false as boolean,
      hovered: false,
      title: ''
    }
  },
  computed: {
    classes(): string[] {
      return [
        ...(this.active ? ['active'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.focused ? ['focused'] : []),
        ...(this.disabled ? ['disabled'] : [])
      ]
    }
  },
  mounted() {
    // TODO: This could probably be improved but doesn't preclude consumers from setting aria attributes explicitly
    // This sets the button title to the first text node we find in the default slot
    const children = this.$slots?.default?.()
    const child = children?.find((child) => child?.el?.nodeName == '#text')
    this.title = child?.el?.textContent?.trim()
  },
  methods: {
    handleMouseDown(): void {
      if (this.disabled) return
      this.focused = true
    },

    handleMouseUp(e: Event): Event {
      this.$emit('click', e, this.href)
      this.focused = false
      return e
    },

    handleMouseEnter(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleMouseLeave(): void {
      this.hovered = false
      this.focused = false
    },

    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(): void {
      this.hovered = false
      this.focused = false
    },

    handleKeyup(e: Event): Event {
      this.$emit('click', e, this.href)
      this.focused = false
      return e
    },

    handleKeydown(): void {
      if (this.disabled) return
      this.focused = true
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../../styles/components/tab';
</style>
