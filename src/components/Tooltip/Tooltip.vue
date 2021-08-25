<template>
  <div class="tooltip-box">
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tooltip',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    classList(): string[] {
      return []
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>
