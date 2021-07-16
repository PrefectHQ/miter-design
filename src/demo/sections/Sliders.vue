<template>
  <div>
    <h3>Slider</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Slider @sliderChange="handleSlide" :min-val=minVal :max-val=maxVal :valProp=val :disabled="state == 'disabled'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Sliders extends Vue {
  states = ['default', 'disabled', 'active']
  val=2
  minVal= 0
  maxVal=10
  mounted(): void {
    return
  }

  handleSlide(val: number): void {
    // eslint-disable-next-line no-console
    this.val = val
    console.log('slider!', this.val)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/slider';
</style>
