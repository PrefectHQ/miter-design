<template>
  <div
    class="wrapper"
    tabindex="0"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleFocus"
    @mouseleave="handleBlur"
    @keydown.enter.space="handleKeydown"
    :class="{ disabled: disabled, active: active }"
  >
    <div
      class="picker"
      :class="classList"
      @click="!disabled ? (active = !active) : null"
    >
      <span
        ><i
          v-if="icon && selected.name?.length > 0"
          :class="iconClass"
          class="pi pi-1x mr-1"
        ></i
        >{{ selected.name || placeholder }}</span
      >
      <i class="pi pi-Arrow-Down pi-lg"></i>
    </div>
    <div class="list" v-show="active">
      <div class="title">{{ title }}</div>
      <div
        v-for="(option, i) of options_"
        :key="i"
        @click="choose(option)"
        @mouseover="handleMouseEnterOption(options_[i])"
        @mouseleave="handleMouseLeaveOption(option)"
        @keydown.enter.space="choose(option)"
        class="option"
        :class="{
          selected: option === selected,
          hovered: options_[option.name].hover,
          active: options_[option.name].active
        }"
      >
        <span
          ><i v-if="icon" :class="iconClass" class="pi pi-1x mr-1"></i>
          {{ option.name }}</span
        >
        <i v-if="option === selected" class="pi pi-Checkmark pi-lg"></i>
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
      type: String,
      default: ''
    }
  },
  data() {
    let options_ = {}
    this.options.forEach((option) => {
      options_[option] = { name: option, hover: false, active: false }
    })
    return {
      hovered: false,
      active: false,
      selected: '',
      options_: options_
    }
  },
  computed: {
    classList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.active ? ['active'] : []),
        ...(this.selected.name?.length > 0 ? ['selected'] : [])
      ]
    },
    iconClass(): string | null {
      return this.icon.length > 0 ? `pi-${this.icon}` : null
    }
  },
  methods: {
    choose(option: string): void {
      this.selected = option
      this.$emit('update:modelValue', this.selected)
      this.active = false
    },

    handleMouseEnterOption(option): void {
      if (this.disabled) return
      this.options_[option.name].hover = true
      this.options_[option.name].active = true
    },

    handleMouseLeaveOption(option): void {
      this.options_[option.name].hover = false
      this.options_[option.name].active = false
    },

    handleKeydown(): void {
      if (this.disabled) return
      this.active = !this.active
    },

    handleFocus(): void {
      if (this.disabled) return
      this.hovered = true
    },

    handleBlur(): void {
      this.hovered = false
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/list';
</style>
