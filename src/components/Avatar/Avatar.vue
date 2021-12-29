<template>
  <div class="avatar" :class="classList">
    <div data-test="default">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MAvatar',
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    classList(): string {
      return this.color
    }
  }
})
</script>

<style lang="scss">
@use '../../styles/components/avatar';
</style>
