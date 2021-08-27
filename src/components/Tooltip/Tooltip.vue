<template>
  <div class="tooltip-box" :class="classList">
    <div class="tooltip">
      <div class="text" data-test="text">
        <slot name="text">Text</slot>
      </div>
    </div>
    <div data-test="default">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tooltip',
  props: {
    right: {
      type: Boolean,
      default: () => false
    },
    left: {
      type: Boolean,
      default: () => false
    },
    bottom: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {}
  },
  computed: {
    classList(): string[] {
      const styles = [
        ...(this.right ? ['right'] : []),
        ...(this.left ? ['left'] : []),
        ...(this.bottom ? ['bottom'] : [])
      ]
      return styles.length > 0 ? styles : ['top']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>
