<template>
  <button class="py-1 px-2"><slot></slot></button>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
