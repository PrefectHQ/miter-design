<template>
  <div>
    <h3>Slider</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize mr-2">{{ state }}:</span>
      <Slider @sliderChange="handleSlide" :min-val=minVal :max-val=maxVal :valProp=val :disabled="state == 'disabled'" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Sliders extends Vue {
  states = ['default', 'disabled', 'active']
  val=2 as number
  minVal= 0 as number
  maxVal=10 as number
  mounted(): void {
    return
  }

  handleSlide(val: string): void {
    // eslint-disable-next-line no-console
    this.val = parseInt(val)
    console.log('slider!', this.val)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/slider';
</style>
