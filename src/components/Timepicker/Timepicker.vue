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
          gap: 12px;
        "
      >
        <i class="pi pi-time-line pi-l" :style="{ height: '32px', width: '32px', 'font-size': '32px', 'margin-right': '8px' }" />
        <NumberInput
          v-model="hourVal"
          :min="min"
          :max="hourMax"
          :step="step"
        />
         <span>:</span>
        <NumberInput :min="min" :max="minMax" v-model="minVal" :step="step"  />
        <span>-</span>
        <div class="number-input-wrapper" :class="classList">
          
    <div>
      <input
        v-model="amPm"
        class="ampm-input"
        :style="`width: ${this.width}px`"
        disabled
        aria-placeholder="AmPm"
        @keypress="handleKeyPress"
      />
      <span class="spin-button-container">
        <button class="spin-button spin-button-up" @click="setAmPm">
          <i class="pi pi-arrow-up-s-fill" />
        </button>
        <button class="spin-button spin-button-down" @click="setAmPm">
          <i class="pi pi-arrow-down-s-fill" />
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
      min: '0',
      hourMax: '12',
      step: '1',
      hourVal: 0,
      maxMin: '60',
      minVal: 0
    }
  },
  emits: ['update:modelValue'],
  watch: {
    value(val) {
      this.$emit('update:modelValue', val)
    }
  },
  methods: {
    setAmPm() {
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

