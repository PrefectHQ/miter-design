<template>
  <div class="wrapper">
    <div
      class="picker"
      :class="pickerClassList"
      @click="!disabled ? (active = !active) : null"
      @focus="handleFocus"
      @blur="handleBlur"
      tabindex="0"
    >
      <span>{{ value || placeholder }}</span>
    </div>
    <div class="list" :class="listClassList">
      <div class="title">{{ title }}</div>
      <div
        class="option"
        v-for="(option, i) in options"
        :key="i"
        :tabindex="i"
        @focus="handleFocus"
        @blur="handleBlur"
      >
        <input
          type="radio"
          :disabled="disabled"
          :id="i"
          :name="label"
          :value="option"
          :checked="checked"
          v-model="value_"
          @input="emit(option)"
        />
        <label :for="i">
          <span><i v-if="icon" class="pi pi-fire pi-2x"></i> {{ option }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'List',
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
    checked: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'list'
    },
    options: {
      type: Array,
      default: ['Option 1', 'Option 2']
    },
    placeholder: {
      type: String,
      default: 'Choose an Option'
    },
    title: {
      type: String,
      default: 'Prefect Dropdown'
    },
    icon: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hovered: false,
      active: false
    }
  },
  computed: {
    pickerClassList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['active'] : [])
      ]
    },
    listClassList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(!this.active ? ['hidden'] : [])
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
    emit(option): void {
      console.log(this.value, option)
      this.$emit('update:modelValue', this.value_)
    },
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
@use '../../styles/components/list';
</style>
