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
      type: Number,
      required: false
    },
    value: {
      type: Number,
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
      const val = this.internalValue
        ? (parseFloat(this.internalValue) / (this.max - this.min)) * 100
        : 0
      return {
        '--slider-val': `${val}%`
      }
    },
    internalValue(): string | undefined {
      return this.value ? this.value?.toString() : this.modelValue?.toString()
    }
  },
  mounted(): void {
    return
  },
  methods: {
    handleInput(e: event) {
      const num = parseFloat(e.target.value)
      this.$emit('update:modelValue', num)
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
