<template>
  <label
    class="checkbox ml-2"
    :class="classList"
    :disabled="disabled"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <input
      type="checkbox"
      :disabled="disabled"
      v-model="value_"
      :value="value_"
      @input="$emit('update:modelValue', $event.target.checked)"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="box"><i class="pi pi-check-line pi-2x" /></span>
    <span data-test="default"><slot /></span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MCheckbox',
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovered: false,
      active: false
    }
  },
  computed: {
    classList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['hovered'] : [])
      ]
    },
    value_: {
      get(): boolean {
        return this.value || this.modelValue
      },
      set(val: boolean) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  methods: {
    handleMouseEnter(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleMouseLeave(): void {
      this.hovered = false
      this.active = false
    },

    handleMouseDown(): void {
      if (this.disabled) return
      this.active = true
    },

    handleMouseUp(): void {
      if (this.disabled) return
      this.active = false
    },

    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(): void {
      this.hovered = false
      this.active = false
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/checkbox';
</style>
