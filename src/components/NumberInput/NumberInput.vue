<template>
  <div class="number-input" data-test="component">
    <fieldset class="number-input__container" :disabled="disabled">
      <input
        v-model="value"
        type="number"
        class="number-input__input"
        v-bind="{ min, max, step, placeholder, required }"
        data-test="input"
        :aria-placeholder="placeholder"
        @keypress="handleKeyPress"
      />
      <span class="number-input__spin-buttons">
        <button class="number-input__spin-button" @click="incrementValue">
          <i class="pi pi-arrow-up-s-fill pi-s" />
        </button>
        <button class="number-input__spin-button" @click="decrementValue">
          <i class="pi pi-arrow-down-s-fill pi-s" />
        </button>
      </span>
    </fieldset>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { safeParseFloat } from '../../utilities/parse'
import { Component } from '../../utilities/vue-class-component'

class Props {
  disabled = prop<Boolean>({ default: false })
  readonly = prop<Boolean>({ default: false })
  min = prop<number | string>({ default: -Infinity })
  max = prop<number | string>({ default: Infinity })
  step = prop<number | string>({ default: 1 })
  placeholder = prop<string>({ required: false, default: null })
  required = prop<Boolean>({ default: false })
  modelValue = prop<number | string>({ required: false, default: 0 })
  defaultValue = prop<number | string>({ required: false, default: 0 })
}

@Component({
  emits: ['update:modelValue']
})
export default class NumberInput extends Vue.with(Props) {

  private get value(): number {
    return safeParseFloat(this.modelValue) || safeParseFloat(this.defaultValue) || 0
  }

  private set value(value: number) {
    if(value < this.parsedMin) {
      this.$emit('update:modelValue', this.parsedMin)
      return
    }
    if(value > this.parsedMax) {
      this.$emit('update:modelValue', this.parsedMax)
      return
    }

    this.$emit('update:modelValue', value)
  }

  private get parsedMin(): number {
    return safeParseFloat(this.min)
  }

  private get parsedMax(): number {
    return safeParseFloat(this.max)
  }

  private get parsedStep(): number {
    return safeParseFloat(this.step)
  }

  public incrementValue(): void {
    this.value += this.parsedStep
  }

  public decrementValue(): void {
    this.value -= this.parsedStep
  }

  private handleKeyPress(e: KeyboardEvent) {
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
