<template>
  <button
    class="tab"
    :class="classes"
    :disabled="disabled"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div>
      <slot> Tab </slot>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tab',
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
      focused: false,
      hovered: false
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
