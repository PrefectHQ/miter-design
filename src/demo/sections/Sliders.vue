<template>
  <div>
    <h3>Slider</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Slider />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Sliders extends Vue {
  states = ['default', 'disabled', 'active']

  mounted(): void {
    return
  }

  handleSlide(): void {
    // eslint-disable-next-line no-console
    console.log('slider!')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/slider';
</style>
