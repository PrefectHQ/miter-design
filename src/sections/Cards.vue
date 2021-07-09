<template>
  <div>
    <h3>Cards</h3>
    This is where I'd put cards... IF I HAD THEM
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Cards extends Vue {
  styles = ['primary', 'secondary', 'outlined']
  states = ['default', 'disabled', 'icon']

  mounted(): void {
    return
  }

  handleClick(): void {
    // eslint-disable-next-line no-console
    console.log('clicked!')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
