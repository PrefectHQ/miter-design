<template>
  <div>
    <hr />
    <div style="padding: 20px">
      <div
        class="timepicker-container"
        style="
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
        "
      >
        <i class="pi pi-time-line pi-x" />
        <NumberInput
          v-model="value1"
          :min="min1"
          :max="max1"
          :step="step1"
        />
        <NumberInput :min="min2" :max="max2" v-model="value2" :step="step2"  />
        <NumberInput :min="min" :max="max" :step="step"  />
      </div>
    </div>
  </div>
</template>

<script>
import NumberInput from '@/components/NumberInput/NumberInput.vue'

export default {
  components: { NumberInput },
  data() {
    return {
      disabled: false,
      min1: '0',
      max1: '24',
      step1: '1',
      value1: 0,
       min2: '0',
      max2: '60',
      step2: '1',
      value2: 0
    }
  },
  emits: ['update:modelValue'],
  watch: {
    value(val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>

<style>
hr {
  border: 1px solid #cecdd3;
  margin: 5px -20px 14px;
  border-bottom: none;
}
</style>
