<template>
  <div>
    <h3>Input</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span v-if="logVal" class="font-weight-light text-capitalize pr-2"
        >{{ state.state }}:</span
      >
      <Input
        v-model="state.val"
        :disabled="state.state == 'disabled'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { computed } from 'vue'

@Options({})
export default class Inputs extends Vue {
  stepVal = 1 as number
  minVal = 0 as number
  maxVal = 10 as number
  states = [
    { state: 'default', val: 'hello' },
    { state: 'disabled', val: 'hello again' }
  ]

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
@use '@/styles/components/input';
</style>
