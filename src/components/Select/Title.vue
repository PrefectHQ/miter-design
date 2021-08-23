<template>
  <div class="title">{{ title }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Select Title',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>
