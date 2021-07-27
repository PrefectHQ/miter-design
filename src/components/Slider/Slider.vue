<template>
  <label
    data-test="default"
    class="slider-label"
    v-if="!hideLabel"
    :for="label"
    >{{ label }}</label
  >
  <input
    type="range"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
    :disabled="disabled || readonly"
    :min="min"
    :max="max"
    :step="step"
    class="slider"
    :value="internalValue"
    @input="handleInput"
    :id="label"
    :class="classList"
    :style="sliderVal"
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
  name: 'Slider',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 50
    },
    step: {
      type: Number,
      default: 1
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
    sliderVal(): object {
      const diff = this.max - this.min
      const val = this.internalValue
        ? ((parseFloat(this.internalValue) - this.min) / diff) * 100
        : 0

      // const wholeVal = Math.floor(val)
      return {
        '--slider-val': `${val}%`
      }
    },
    internalValue(): string {
      return this.value || this.modelValue || '0'
    }
  },
  mounted(): void {
    return
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
