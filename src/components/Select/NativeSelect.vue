<template>
  <div class="native-select" :class="classes.select">
    <div class="native-select__input-container">
      <select v-model="value" class="native-select__input" :disabled="disabled">
        <template v-for="(optionOrGroup, i) in options" :key="i">
          <template v-if="isOptionGroup(optionOrGroup)">
            <optgroup :label="optionOrGroup.label" :disabled="optionOrGroup.disabled">
              <template v-for="(option, x) in optionOrGroup.options" :key="x">
                <option :value="option.value" :disabled="option.disabled">{{ option.label }}</option>
              </template>
            </optgroup>
          </template>
          <template v-else>
            <option :value="optionOrGroup.value" :disabled="optionOrGroup.disabled">{{ optionOrGroup.label }}</option>
          </template>
        </template>
      </select>
      <template v-if="modelValue === null">
        <label class="native-select__label">
          {{ label }}
        </label>
      </template>
      <i class="native-select__arrow pi pi-arrow-down-s-line pi-lg" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Options } from './types'
import { isOptionGroup } from './utilities'
import { Component } from '@/utilities/vue-class-component'

class Props {
  modelValue = prop<string | null>({ default: null })
  options = prop<Options>({ default: () => ({}) })
  label = prop<string>({ default: 'Choose an Option' })
  disabled = prop<boolean | string>({ default: false })
}

@Component({
  emits: ['update:modelValue']
})
export default class NativeSelect extends Vue.with(Props) {

  private isOptionGroup = isOptionGroup

  get value() {
    return this.modelValue
  }

  set value(value: string | null) {
    this.$emit('update:modelValue', value)
  }

  get classes() {
    return {
      select: {
        'native-select--disabled': this.disabled || this.disabled === '',
        'native-select--selected': this.modelValue !== null
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/variables';
@use '../../styles/abstracts/mixins';

.native-select {
  --select-background-color: #fff;
  --select-cursor: pointer;
  --miter-width: 16px;

  width: 350px;
  height: 58px;
  user-select: none;
}

.native-select--disabled {
  --select-background-color: #{variables.$disabled};
  --select-cursor: not-allowed;
}

.native-select:focus-within {
  --miter-border-color: #{variables.$primary};
}

.native-select__input-container {
  position: relative;
  width: inherit;
  height: inherit;

  @include mixins.miter-bordered-rounded;
}

.native-select__label {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #{variables.$grey-20};
}

.native-select__arrow {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #{variables.$grey-80};
  pointer-events: none;
}

.native-select__input {
  background-color: var(--select-background-color);
  cursor: var(--select-cursor);
  appearance: none;
  width: inherit;
  height: inherit;
  border: 0;
  padding: 0 20px;
  color: inherit;
}
</style>