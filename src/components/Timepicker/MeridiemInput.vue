<template>
  <div class="number-input" :class="classes">
    <div class="number-input__container">
      <input
        v-model="meridiem"
        class="number-input__input"
        v-bind="{ disabled, required }"
        :aria-placeholder="meridiem"
        @keydown="keydown"
      />
      <span class="number-input__spin-buttons">
        <button class="number-input__spin-button" @click="setMeridiem">
          <i class="pi pi-arrow-up-s-fill pi-s" />
        </button>
        <button class="number-input__spin-button" @click="setMeridiem">
          <i class="pi pi-arrow-down-s-fill pi-s" />
        </button>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '../../utilities/vue-class-component'

class Props {
  disabled = prop<Boolean>({ default: false })
  readonly = prop<Boolean>({ default: false })
  required = prop<Boolean>({ default: false })
  modelValue = prop<'AM' | 'PM'>({ required: false, default: 'AM' })
}

@Component({
  emits: ['update:modelValue']
})
export default class MeridiemInput extends Vue.with(Props) {

  private get meridiem() {
    return this.modelValue
  }

  private set meridiem(value) {
    this.$emit('update:modelValue', value)
  }

  private get classes() {
    return {
      'number-input--disabled': this.disabled || this.disabled === ''
    }
  }

  private keydown(event: KeyboardEvent) {
    if(event.key == 'Tab') {
      return
    }

    event.preventDefault();

    this.setMeridiem()
  }


  private setMeridiem() {
    this.meridiem = this.meridiem == 'AM' ? 'PM' : 'AM'
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
</style>
