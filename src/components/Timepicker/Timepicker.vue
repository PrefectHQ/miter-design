<template>
  <div class="time-picker">
    <i class="time-picker__icon pi pi-time-line" />
    <fieldset class="time-picker__fieldset" :disabled="disabled">
      <NumberInput v-model="hours" min="1" max="12" />
      <span class="time-picker__separator">:</span>
      <NumberInput v-model="minutes" min="0" max="59" />
      <span class="time-picker__separator">-</span>
      <MeridiemInput v-model="meridiem" />
    </fieldset>
  </div>
</template>

<script lang="ts">
import NumberInput from '../NumberInput/NumberInput.vue'
import MeridiemInput from './MeridiemInput.vue'

export default {
  components: {
    NumberInput,
    MeridiemInput
  },
  props: {
    modelValue: {
      type: Date,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  computed: {
    hours: {
      get() {
        const hours = this.modelValue.getHours()
        const adjustedForMeridiem = ((hours + 11) % 12) + 1

        return adjustedForMeridiem
      },
      set(hours: number) {
        if (!hours) return

        const date = new Date(this.modelValue.getTime())
        let hoursAdjusted = hours

        if (hoursAdjusted === 12) {
          hoursAdjusted = 0
        }

        if (date.getHours() >= 12) {
          hoursAdjusted += 12
        }

        date.setHours(hoursAdjusted)
        this.$emit('update:modelValue', date)
      }
    },
    minutes: {
      get() {
        return this.modelValue
          .getMinutes()
          .toLocaleString(undefined, { minimumIntegerDigits: 2 })
      },
      set(minutes: number) {
        const date = new Date(this.modelValue.getTime())

        date.setMinutes(minutes)

        this.$emit('update:modelValue', date)
      }
    },
    meridiem: {
      get(): 'AM' | 'PM' {
        const hours = this.modelValue.getHours()

        return hours >= 12 ? 'PM' : 'AM'
      },
      set(value: 'AM' | 'PM') {
        const date = new Date(this.modelValue.getTime())
        const hours = this.modelValue.getHours()

        if (value == 'AM' && hours >= 12) {
          date.setHours(hours - 12)
        } else if (value == 'PM' && hours < 12) {
          date.setHours(hours + 12)
        }

        this.$emit('update:modelValue', date)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
@use '../../styles/components/time-picker.scss';
</style>
