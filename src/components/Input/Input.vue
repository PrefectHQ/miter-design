<template>
  <label
    data-test="default"
    class="slider-label"
    v-if="!hideLabel"
    :for="label"
    >{{ label }}</label
  >
  <input
    placeholder="Input"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
    :disabled="disabled || readonly"
    :value="internalValue"
    @input="handleInput"
  />
</template>


<script lang="ts">
import { defineComponent } from 'vue'

interface event {
  target: {
    value: string
  }
}

export default defineComponent({
  name: 'Input',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: ''
    },
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    classList(): any {
      return this.disabled ? ['disabled'] : this.active ? ['active'] : []
    },
    internalValue(): string {
      return this.value || this.modelValue || '0'
    }
  },
  methods: {
    handleInput(e: event) {
      this.$emit('update:modelValue', e.target.value)
    },
    handleMouseEnter(): void {
      if (this.disabled) return
      this.active = true
    },
    handleMouseLeave(): void {
      if (this.disabled) return
      this.active = false
    },
    handleMouseDown(): void {
      if (this.disabled) return
      this.active = true
    },
    handleMouseUp(): void {
      this.active = false
    },
    handleFocus(): void {
      if (this.disabled) return
      this.active = true
    },
    handleBlur(): void {
      this.active = false
    },
    handleKeyup(): void {
      this.active = false
    },
    handleKeydown(): void {
      if (this.disabled) return
      this.active = true
    }
  }
})
</script>


<style lang="scss" scoped >
@use '../../styles/components/slider';
</style>
