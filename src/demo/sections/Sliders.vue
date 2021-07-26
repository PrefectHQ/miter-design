<template>
  <div>
    <h3>Slider</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span v-if="logVal" class="font-weight-light text-capitalize pr-2"
        >{{ state.state }}:</span
      >
      <Slider
        v-model="state.val"
        :min="minVal"
        :max="maxVal"
        :step="stepVal"
        :disabled="state.state == 'disabled'"
      />
      <button @click="state.val += 1">plus</button>
      <button @click="state.val -= 1">minus</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { computed } from 'vue'

@Options({})
export default class Sliders extends Vue {
  states = [
    { state: 'default', val: 8 },
    { state: 'disabled', val: 5 }
  ]
  stepVal = 1 as number
  minVal = 0 as number
  maxVal = 10 as number
  mounted(): void {
    return
  }
  logVal = computed(() => {
    console.log(
      'val',
      this.states.map((state) => state.val)
    )
    return true
  })
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/slider';
</style>
