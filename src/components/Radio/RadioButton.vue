<template>
  <div class="wrapper">
    <label
      class="radio ml-2"
      :class="classList"
      :disabled="disabled"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <input
        type="radio"
        :disabled="disabled"
        :name="name"
        :value="value"
        :checked="checked"
        v-model="value_"
        @input="$emit('update:modelValue', value_)"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span class="radio-button"></span>
      <span data-test="default"><slot /></span>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RadioButton',
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: 'button-group'
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
      get(): String {
        return this.value
      },
      set() {
        this.$emit('update:modelValue', this.value)
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
@use '../../styles/components/radio';
</style>
