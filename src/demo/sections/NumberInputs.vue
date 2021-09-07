<template>
  <div>
    <h3>Inputs - Number</h3>

    <div class="mt-4">
      <h5>Configuration</h5>
      <div class="my-1"> Min: <input v-model="min" type="number" /> </div>
      <div class="my-1">
        Max:
        <input v-model="max" type="number" />
      </div>
      <div class="my-1">
        Step: <input v-model="step" type="number" min="0" />
      </div>
      <div class="my-1">
        <label for="disabled-number-input">Disabled: </label>
        <input id="disabled-number-input" type="checkbox" v-model="disabled" />
      </div>
      <h4 class="my-1">{{ value }}</h4>
      <div>
        <NumberInput
          v-model="value"
          :disabled="disabled"
          :min="min"
          :max="max"
          :step="step"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberInput from '@/components/NumberInput/NumberInput.vue'
import Checkbox from '@/components/Checkbox/Checkbox.vue'

export default defineComponent({
  name: 'NumberInputs',
  components: { Checkbox, NumberInput },
  data() {
    return {
      disabled: false,
      min: '-100',
      max: '100',
      step: '1',
      value: 0
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/input--number';
</style>
