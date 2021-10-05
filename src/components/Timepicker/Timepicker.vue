<template>
  <div class="time-picker">
    <i class="time-picker__icon pi pi-time-line" />
    <fieldset class="time-picker__fieldset" :disabled="disabled">
      <NumberInput v-model="hours" min="1" max="12" />
      <span class="time-picker__separator">:</span>
      <NumberInput v-model="minutes" min="0" max="59" />
      <span class="time-picker__separator">-</span>
      <!-- this should probably be abstracted into its own input. Leaving here for speed now -->
      <div class="number-input-wrapper">
        <div>
          <input
            v-model="meridiem"
            class="ampm-input"
            :aria-placeholder="meridiem"
            @keydown.prevent="setMeridiem"
          />
          <span class="spin-button-container">
            <button class="spin-button spin-button-up" @click="setMeridiem">
              <i class="pi pi-arrow-up-s-fill" />
            </button>
            <button class="spin-button spin-button-down" @click="setMeridiem">
              <i class="pi pi-arrow-down-s-fill" />
            </button>
          </span>
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script lang="ts">
import NumberInput from '@/components/NumberInput/NumberInput.vue'

export default {
  components: { 
    NumberInput 
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
        const adjustedForMeridiem = (hours + 11) % 12 + 1
        return adjustedForMeridiem
      },
      set(hours: number) {
        if(!hours) return
        const date = new Date(this.modelValue.getTime())
        let hoursAdjusted = hours
        
        if(hoursAdjusted === 12) {
          hoursAdjusted = 0
        }

        if(date.getHours() >= 12) {
          hoursAdjusted += 12
        }

        date.setHours(hoursAdjusted)
        this.$emit('update:modelValue', date)
      }
    },
    minutes: {
      get() {
        return this.modelValue.getMinutes().toLocaleString(undefined, { minimumIntegerDigits: 2 })
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
        
        if(value == 'AM' && hours >= 12) {
          date.setHours(hours - 12)
        } else if(value == 'PM' && hours < 12) {
          date.setHours(hours + 12)
        }

        this.$emit('update:modelValue', date)
      }
    }
  },
  methods: {
    setMeridiem() {
      this.meridiem = this.meridiem == 'AM' ? 'PM' : 'AM'
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
@use '../../styles/components/time-picker.scss';
</style>

