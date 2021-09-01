<template>
  <div class="tag-wrapper" :class="classList">
    <span class="tag" data-test="default"> <slot /></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tag',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    elevated: {
      type: Boolean,
      default: false
    },
    hovered: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    classList(): string[] {
      return [
        ...(this.disabled ? ['disabled'] : []),
        ...(this.outlined ? ['outlined'] : []),
        ...(this.hovered ? ['hovered'] : []),
        ...(this.elevated ? ['elevated'] : []),
        this.color
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
