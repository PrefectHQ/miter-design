<template>
<div :class="classList" 
  @mouseenter="handleMouseEnter"
  @mouseleave="handleMouseLeave" 
  class="flexInput">
<span class="icon" data-test="icon"><slot /></span>
<span class="input-text">
  <label
    data-test="default"
    v-if="!hideLabel"
    :for="label"
    class="input-label"
    > {{label}}</label>
  <input
    :id="label"
    :type="inputType"
    placeholder="Input"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" 
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
    :disabled="disabled"
    :value="internalValue"
    :valid="valid"
    :required="required"
    @invalid.capture="handleInvalid"
    @input="handleInput"
    class="input"
    :class="classList"
  />
</span>
</div>
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
    inputType: {
        type: String,
        default: 'text'
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
      required: false
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    valid: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      active: false as boolean,
      hovered: false as boolean,
      invalid: !this.valid as boolean,
    }
  },
  computed: {
    classList(): any {
      return this.disabled ? ['disabled'] : this.invalid ? ['invalid'] : this.active ? ['active'] : this.hovered ? ['hovered'] : []
    },
    internalValue(): string {
      return this.value || this.modelValue || ''
    }
  },
  methods: {
  handleInput(e: event) {
    this.$emit('update:modelValue', e.target.value)
  },
  handleInvalid() {
    this.invalid = true
  },
  handleMouseEnter(): void {
    if (this.disabled) return
    this.hovered = true
  },
  handleMouseLeave(): void {
    this.hovered = false
  },
  handleMouseDown(): void {
    if (this.disabled) return
    this.active = true
  },
  handleFocus(): void {
    if (this.disabled) return
    this.hovered = true
    this.active = true
  },
  handleBlur(e:Event): void {
    this.validate(e)
    this.hovered = false
    this.active = false
  },
  handleKeydown(e:Event): void {
    if (this.disabled) return
    this.validate(e)
    e.target?.blur()
  },
  validate(e:Event) {
  const valid = e.target?.checkValidity()
  this.rules()
  this.invalid = !valid  
  }
  }
})
</script>


<style lang="scss" scoped >
@use '../../styles/components/input';
</style>
