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
        <i class="pi pi-time-line pi-l" />
        <NumberInput
          v-model="value1"
          :min="min1"
          :max="max1"
          :step="step1"
        />
        <NumberInput :min="min2" :max="max2" v-model="value2" :step="step2"  />
        <div class="number-input-wrapper" :class="classList">
    <div>
      <input
        v-model="amPm"
        class="ampm-input"
        :style="`width: ${this.width}px`"
        disabled
        :aria-placeholder="AmPm"
        @keypress="handleKeyPress"
      />
      <span class="spin-button-container">
        <button class="spin-button spin-button-up" @click="AMPM">
          <i class="pi pi-arrow-up-s-fill pi-s" />
        </button>
        <button class="spin-button spin-button-down" @click="AMPM">
          <i class="pi pi-arrow-down-s-fill pi-s" />
        </button>
      </span>
    </div>
  </div>
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
      amPm: 'AM',
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
  },
  methods: {
    AMPM() {
      this.amPm == 'AM'? this.amPm = 'PM': this.amPm = 'AM'
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

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
</style>

