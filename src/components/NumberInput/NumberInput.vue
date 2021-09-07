<template>
  <div class="number-input-wrapper">
    <div>
      <input
        v-model="value_"
        type="number"
        :max="max_"
        :min="min_"
        :step="step_"
        :disabled="disabled"
        :placeholder="placeholder"
        :aria-placeholder="placeholder"
        :required="required"
        @keypress="handleKeyPress"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  disabled = prop<Boolean>({ default: false })
  readonly = prop<Boolean>({ default: false })
  min = prop<number | string>({ default: null })
  max = prop<number | string>({ default: null })
  step = prop<number | string>({ default: 1 })
  placeholder = prop<string>({ required: false, default: null })
  required = prop<Boolean>({ default: false })
  modelValue = prop<number | string>({ required: false, default: null })
  value = prop<number | string>({ required: false, default: null })
}

const Component = Options
@Component({
  watch: {
    value_(val) {
      if (this.parsedValue > this.parsedMax) return (this.value_ = this.max_)
      if (this.parsedValue < this.parsedMin) return (this.value_ = this.min_)
      this.$emit('update:modelValue', val)
    }
  }
})
export default class NumberInput extends Vue.with(Props) {
  value_ = this.modelValue || this.value

  get min_(): string {
    return typeof this.min == 'number' ? this.min.toString() : this.min
  }

  get max_(): string {
    return typeof this.max == 'number' ? this.max.toString() : this.max
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

  get parsedValue(): number {
    return typeof this.value_ == 'string'
      ? parseFloat(this.value_)
      : this.value_
  }

  handleKeyPress(e: KeyboardEvent) {
    // Prevent non-numeric key presses
    if (!/[\-0-9]/i.test(e.key)) {
      return e.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
</style>
