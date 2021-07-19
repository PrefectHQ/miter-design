<template>
  <button class="tab">
    <slot> Tab </slot>
  </button>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

@Options({})
export default class Tab extends Vue.with(Props) {
  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tab';
</style>
