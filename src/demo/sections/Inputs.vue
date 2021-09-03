<template>
  <div>
    <h3>Input</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <Input
        v-model="state.val"
        :disabled="state.state == 'disabled'"
        :label="state.label"
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
    { state: 'default', val: 'hello', label: 'Default' },
    { state: 'disabled', val: 'Hello again', label: 'Disabled' }
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
