<template>
  <div
    :class="outerClassList"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @keydown.enter="handleKeydown"
    class="flexInput"
    :style="$attrs.style"
  >
    <span class="prepend" data-test="prepend"><slot name="prepend" /></span>
    <span class="input-text">
      <label
        data-test="label"
        v-if="!hideLabel"
        :for="label"
        class="input-label"
      >
        {{ label }}</label
      >
      <input
        :disabled="disabled"
        ref="inputbox"
        data-test="default"
        @keyup="handleKeyup"
        @keydown="handleKeydown"
        @keypress="handleKeyPress"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="handleMouseDown"
        @focus="handleFocus"
        @blur="handleBlur"
        :value="internalValue"
        :valid="valid"
        :required="required"
        :maxlength="maxLength"
        :minlength="minLength"
        @invalid.capture="handleInvalid"
        @input="handleInput"
        class="input"
        :class="classList"
        v-bind="attributes"
      />
      <p v-if="subtitle" data-test="subtitle" class="subtitle">{{
        subtitle
      }}</p>
    </span>
    <span v-if="!validityIcon" class="append" data-test="append"
      ><slot name="append" />
    </span>
    <span class="append" :class="classList" v-else>
      <i v-if="!invalid" class="pi-check-line"></i>
      <i v-if="invalid" class="pi-error-warning-line invalid"></i>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Event {
  target: {
    value: string
    validity: any
    blur: any
    checkValidity: any
  }
}

interface $refs {
  inputbox: {
    focus: any
  }
}

export default defineComponent({
  name: 'MInput',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    },
    validityIcon: {
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
    required: {
      type: Boolean,
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
    maxLength: {
      type: Number,
      required: false
    },
    minLength: {
      type: Number,
      required: false
    }
  },
  emits: ['update:modelValue', 'invalid', 'keyup', 'keypress', 'keydown'],
  data() {
    return {
      active: false as boolean,
      hovered: false as boolean,
      invalid: !this.valid as boolean
    }
  },
  computed: {
    outerClassList(): any {
      const baseList = [this.$attrs.class]
      return this.disabled
        ? ['disabled', ...baseList]
        : this.invalid
        ? ['invalid', ...baseList]
        : this.active
        ? ['active', ...baseList]
        : this.hovered
        ? ['hovered', ...baseList]
        : baseList
    },
    classList(): any {
      return this.disabled
        ? ['disabled']
        : this.invalid
        ? ['invalid']
        : this.active
        ? ['active']
        : this.hovered
        ? ['hovered']
        : []
    },
    attributes() {
      const attrsCopy = { ...this.$attrs }
      delete attrsCopy.class
      delete attrsCopy.style
      return attrsCopy
    },
    internalValue(): string {
      return this.value || this.modelValue || ''
    },
    iconClass(): any {
      return this.invalid ? ['invalid'] : ['valid']
    }
  },
  methods: {
    handleKeydown(e: Event): void {
      if (this.disabled) return
      this.$emit('keydown', e)
    },
    handleKeyup(e: KeyboardEvent) {
      if (this.disabled) return
      this.$emit('keyup', e)
    },
    handleKeypress(e: KeyboardEvent) {
      if (this.disabled) return
      this.$emit('keypress', e)
    },
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
      setTimeout(() => {
        ;(this.$refs.inputbox as any).focus()
      }, 100)
    },
    handleFocus(): void {
      if (this.disabled) return
      this.active = true
    },
    handleBlur(e: Event): void {
      this.validate(e)
      this.hovered = false
      this.active = false
    },
    validate(e: Event) {
      const valid = e.target?.checkValidity()
      this.invalid = !valid
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/input';
</style>
