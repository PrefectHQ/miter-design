<template>
  <div>
    <h3>Slider</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span v-if="logVal" class="font-weight-light text-capitalize pr-2"
        >{{ state.state }}:</span
      >
      <Slider
        v-model="buttonVal"
        :min="minVal"
        :max="maxVal"
        :step="stepVal"
        :disabled="state.state == 'disabled'"
      />
    </div>
    <button @click="buttonVal += 1" style="margin-right: 10px">Add 1 </button>
    <button @click="buttonVal -= 1">Minus 1</button>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { computed } from 'vue'

@Options({})
export default class Sliders extends Vue {
  stepVal = 1 as number
  minVal = 0 as number
  maxVal = 10 as number
  buttonVal = 2 as number
  states = [
    { state: 'default', val: this.buttonVal },
    { state: 'disabled', val: 5 }
  ]

  mounted(): void {
    return
  }
  logVal = computed(() => {
    console.log('val', this.buttonVal)
    return true
  })
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/slider';
</style>
