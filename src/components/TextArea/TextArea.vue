<template>
  <div class="wrapper">
    <span class="label-wrapper">
      <label :for="label" v-show="!hideLabel" class="title">{{ label }}</label>
      <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
    </span>
    <div
      class="textarea-wrapper"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @focus="handleFocus"
      :class="classList"
    >
      <div class="textarea" :class="classList">
        <textarea
          :id="label"
          :disabled="disabled"
          :placeholder="placeholder"
          :value="internalValue"
          :valid="valid"
          :required="required"
          :maxlength="maxLength"
          :minlength="minLength"
          :class="classList"
          @invalid.capture="handleInvalid"
          @input="handleInput"
          @blur="handleBlur"
        ></textarea>
      </div>
    </div>
    <div class="error-msg" v-if="invalid"><slot name="errorMessage" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextArea',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
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
      default: 'textarea'
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Write here...'
    },
    valid: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      required: false
    },
    minLength: {
      type: Number,
      required: false
    }
  },
  emits: ['update:modelValue', 'invalid'],
  data() {
    return {
      focused: false as boolean,
      hovered: false as boolean,
      invalid: !this.valid as boolean
    }
  },
  computed: {
    classList(): any {
      return this.disabled
        ? ['disabled']
        : this.invalid
        ? ['invalid']
        : this.focused
        ? ['focused']
        : this.hovered
        ? ['hovered']
        : []
    },
    internalValue(): string {
      return this.value || this.modelValue || ''
    }
  },
  methods: {
    handleInput(e: Event) {
      this.validate(e)
      this.$emit('update:modelValue', e.target?.value)
    },
    handleInvalid(e: Event) {
      this.$emit('invalid', e.target?.validity)
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
      this.focused = true
    },
    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
      this.focused = true
    },
    handleBlur(e: Event): void {
      this.validate(e)
      this.hovered = false
      this.focused = false
    },
    validate(e: Event) {
      const valid = e.target?.checkValidity()
      this.invalid = !valid
    }
  }
})
</script>
<style lang="scss" scoped>
@use '../../styles/components/textarea';
</style>
