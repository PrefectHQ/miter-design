<template>
  <div
    @click="choose"
    @mouseenter="handleFocus"
    @mouseleave="handleBlur"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.enter.space="choose"
    class="option"
    :class="{
      selected: selected,
      hovered: hovered
    }"
  >
    <span
      ><i v-if="icon" :class="iconClass" class="pi pi-1x mr-1"></i>
      {{ value }}</span
    >
    <i v-if="selected" class="pi pi-Checkmark pi-lg"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Option',
  emits: {
    'update:modelValue'(...args: any[]) {
      return { ...args }
    }
  },
  props: {
    value: {
      type: String,
      default: 'Option'
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      selected: false,
      hovered: false
    }
  },
  computed: {
    iconClass(): string | null {
      return this.icon.length > 0 ? `pi-${this.icon}` : null
    }
  },
  methods: {
    choose(): void {
      this.selected = true
      this.$emit('update:modelValue', this.value)
    },

    handleFocus(): void {
      this.hovered = true
    },

    handleBlur(): void {
      this.hovered = false
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>
