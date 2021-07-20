<template>
  <button class="tab" @click="handleClick">
    <slot> Tab </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tab',
  emits: {
    click(e: Event, ...args: any[]) {
      return { e, ...args }
    }
  },
  props: {
    href: {
      type: String
    }
  },
  methods: {
    handleClick(e: Event): Event {
      this.$emit('click', e, this.href)
      return e
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../../styles/components/tab';
</style>
