<template>
  <div>
    <h3 id="links">Links</h3>

    <div class="my-1 text--grey-4">(hover for active)</div>

    <a>Link</a>
    <a class="disabled ml-4">Link</a>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Links extends Vue {
  states = ['default', 'disabled']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
