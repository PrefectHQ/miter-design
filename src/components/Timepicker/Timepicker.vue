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
        <i class="pi pi-time-line pi-2x" />
        <NumberInput
          v-model="value"
          :min="min"
          :max="max"
          :step="step"
        />
        <NumberInput :min="min" :max="max" :step="step"  />
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
      min: '-100',
      max: '100',
      step: '1',
      value: 0
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
