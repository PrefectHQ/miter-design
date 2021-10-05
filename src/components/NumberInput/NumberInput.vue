<template>
  <div class="number-input-wrapper" data-test="outer" :class="classList">
    <div>
      <input
        v-model="value_"
        :style="`width: ${this.width}px`"
        type="number"
        :max="max_"
        :min="min_"
        :step="step_"
        data-test="default"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-placeholder="placeholder"
        :required="required"
        @keypress="handleKeyPress"
      />
      <span class="spin-button-container">
        <button class="spin-button spin-button-up" @click="incrementValue">
          <i class="pi pi-arrow-up-s-fill pi-s" />
        </button>
        <button class="spin-button spin-button-down" @click="decrementValue">
          <i class="pi pi-arrow-down-s-fill pi-s" />
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  disabled = prop<Boolean>({ default: false })
  readonly = prop<Boolean>({ default: false })
  min = prop<number | string>({ default: -Infinity })
  max = prop<number | string>({ default: Infinity })
  step = prop<number | string>({ default: 1 })
  placeholder = prop<string>({ required: false, default: null })
  required = prop<Boolean>({ default: false })
  modelValue = prop<number | string>({ required: false, default: 0 })
  value = prop<number | string>({ required: false, default: 0 })
  width = prop<String>({ default: '' })
}

const Component = Options
@Component({
  emits: ['update:modelValue'],
  watch: {
    value_(val) {
      if (this.parsedValue > this.parsedMax)
        return (this.value_ = this.parsedMax)
      if (this.parsedValue < this.parsedMin)
        return (this.value_ = this.parsedMin)
      this.$emit('update:modelValue', val)
    },
    modelValue(val) {
      this.value_ = this.modelValue
    }
  }
})
export default class NumberInput extends Vue.with(Props) {
  value_ = this.modelValue || this.value || 0
  get classList(): string[] {
    const list = [...(this.disabled ? ['disabled'] : [])]
    return list
  }

  get min_(): string {
    return typeof this.min !== 'string' ? this.min.toString() : this.min
  }

  get max_(): string {
    return typeof this.max !== 'string' ? this.max.toString() : this.max
  }
  get step_(): string {
    return typeof this.step == 'number' ? this.step.toString() : this.step
  }

  get parsedMax(): number {
    return typeof this.max == 'string' ? parseFloat(this.max) : this.max
  }

  get parsedMin(): number {
    return typeof this.min == 'string' ? parseFloat(this.min) : this.min
  }

  get parsedStep(): number {
    return typeof this.step == 'string' ? parseFloat(this.step) : this.step
  }

  get parsedValue(): number {
    return typeof this.value_ == 'string'
      ? parseFloat(this.value_)
      : this.value_
  }

  incrementValue(): void {
    this.value_ = this.parsedValue + this.parsedStep
  }

  decrementValue(): void {
    this.value_ = this.parsedValue - this.parsedStep
  }

  handleKeyPress(e: KeyboardEvent) {
    // Prevent non-numeric key presses
    // Note: this is necessary because not all browsers respect type=number inputs (looking at you firefox)
    if (!/[\-0-9]/i.test(e.key)) {
      return e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
</style>
