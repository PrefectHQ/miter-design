<template>
  <button><slot></slot></button>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'

export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
