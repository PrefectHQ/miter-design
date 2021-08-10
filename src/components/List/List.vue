<template>
  <div class="wrapper" tabindex="0" @focus="handleFocus" @blur="handleBlur">
    <div
      class="picker"
      :class="pickerClassList"
      @click="!disabled ? (active = !active) : null"
    >
      <span
        ><i v-if="icon && selected.length > 0" class="pi pi-fire pi-1x"></i
        >{{ selected || placeholder }}</span
      >
    </div>
    <div class="list" :class="listClassList">
      <div class="title">{{ title }}</div>
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="choose(option)"
        class="option"
      >
        <span><i v-if="icon" class="pi pi-fire pi-1x"></i> {{ option }}</span>
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
      active: false,
      selected: ''
    }
  },
  computed: {
    pickerClassList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['active'] : []),
        ...(this.selected.length > 0 ? ['selected'] : [])
      ]
    },
    listClassList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(!this.active ? ['hidden'] : [])
      ]
    }
  },
  methods: {
    choose(option: string): void {
      this.selected = option
      this.$emit('update:modelValue', this.selected)
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
