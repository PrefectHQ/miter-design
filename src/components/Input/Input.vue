<template>
  
    <div
      :class="classList"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mouseup="handleMouseUp"
      @mousedown="handleMouseDown"
      @keydown.enter="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
      class="flexInput"
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
          :id="label"
          ref="inputbox"
          data-test="default"
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
          :pattern="pattern"
          :maxlength="maxLength"
          :minlength="minLength"
          @invalid.capture="handleInvalid"
          @input="handleInput"
          class="input"
          :class="classList"
        />
        <p v-if="subtitle" data-test="subtitle" class="subtitle">{{
          subtitle
        }}</p>
      </span>
      <span v-if="!validityIcon" class="append" data-test="append"
        ><slot name="append" />
      </span>
      <span class="append" :class="classList" v-else>
        <i v-if="!invalid" class="pi pi-Checkmark pi-2x"></i>
        <i v-if="invalid" class="pi pi-Warning pi-2x invalid"></i>
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
  name: 'Input',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
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
    },
    maxLength: {
      type: Number,
      required: false
    },
    minLength: {
      type: Number,
      required: false
    },
    pattern: {
      type: String,
      required: false
    }
  },
  emits: ['update:modelValue', 'invalid'],
  data() {
    return {
      active: false as boolean,
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
        : this.active
        ? ['active']
        : this.hovered
        ? ['hovered']
        : []
    },
    internalValue(): string {
      return this.value || this.modelValue || ''
    },
    iconClass(): any {
      return this.invalid ? ['invalid'] : ['valid']
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
      this.active=true
      setTimeout(() => {
        (this.$refs.inputbox as any).focus()
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
    handleKeydown(e: Event): void {
      if (this.disabled) return
      this.validate(e)
      e.target?.blur()
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
