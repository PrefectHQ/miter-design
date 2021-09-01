<template>
  <div>
    <div> Date: {{ date }} </div>
    <div> Today: {{ today }} </div>
    <div> Display Month: {{ displayMonth }} </div>
    <div>
      <span class="mr-2 cursor-pointer pa-2" @click="decrementMonth">-</span>
      Month: {{ month }}
      <span class="ml-2 cursor-pointer pa-2" @click="incrementMonth">+</span>
    </div>
    <div> Days in Month: {{ daysInMonth }} </div>
    <div> Year: {{ year }} </div>

    <div class="days-grid">
      <div
        v-for="day in daysInMonth"
        :key="day"
        class="day"
        :class="'day-' + getDayOfTheWeek(day)"
      >
        {{ day }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class DatePicker extends Vue.with(Props) {
  date = new Date()

  get today(): Date {
    return new Date()
  }

  get month(): number {
    return new Date(this.date).getMonth()
  }

  get displayMonth(): string {
    const months: string[] = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    return months[this.month]
  }

  get year(): number {
    return new Date(this.date).getFullYear()
  }

  get daysInMonth(): number {
    return 32 - new Date(this.year, this.month, 32).getDate()
  }

  incrementMonth() {
    this.date = new Date(this.year, this.month + 1)
  }

  decrementMonth() {
    this.date = new Date(this.year, this.month - 1)
  }

  getDayOfTheWeek(day: number): number {
    return new Date(this.year, this.month, day).getDay()
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/date-picker.scss';
</style>
