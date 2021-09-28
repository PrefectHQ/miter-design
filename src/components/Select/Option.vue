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
      hovered: hovered,
      disabled: disabled
    }"
    tabindex="0"
  >
    <span>
      <i v-if="icon" :class="iconClass" class="pi pi-1x mr-1"></i>
      <slot>{{ value }}</slot>
    </span>
    <i v-if="selected" class="pi pi-check-line pi-lg"></i>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Option',
  emits: {
    click(e: Event, ...args: any[]) {
      return { e, ...args }
    }
  },
  props: {
    value: {
      type: String,
      required: true,
      default: 'Option'
    },
    data: {
      type: [String, Object]
    },
    icon: {
      type: String,
      default: ''
    },
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovered: false
    }
  },
  computed: {
    iconClass(): string | null {
      return this.icon.length > 0 ? `pi-${this.icon}` : null
    }
  },
  methods: {
    choose(e: Event): Event {
      this.$emit('click', e, this.value, this.icon, this.data)
      return e
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
@use '../../styles/components/select';
</style>
