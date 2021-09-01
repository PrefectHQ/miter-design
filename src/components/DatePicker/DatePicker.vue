<template>
  <div class="calendar">
    <div class="calendar-header">
      <button class="month-button cursor-pointer" @click="decrementMonth">
        <i class="pi pi-Arrow-Left" />
      </button>
      <div class="month-title">{{ displayMonth }} {{ year }}</div>
      <button class="month-button cursor-pointer" @click="incrementMonth">
        <i class="pi pi-Arrow-Right" />
      </button>
    </div>

    <transition :name="monthDirection == 1 ? 'slide' : 'slide-reverse'">
      <div class="days-grid" :key="month">
        <div class="days-header-grid">
          <div
            v-for="(n, i) in 7"
            class="day-header"
            :class="'day-' + getDayOfTheWeek(i)"
            :key="i"
          >
            {{ getDisplayDay(i) }}
          </div>
        </div>

        <div
          v-for="day in Array.from({ length: getDayOfTheWeek(1) })
            .map((e, i) => daysInPreviousMonth - i)
            .reverse()"
          :key="day"
          class="day previous-month"
          :class="'day-' + getDayOfTheWeekPreviousMonth(day)"
        >
          {{ day }}
        </div>

        <div
          v-for="day in daysInMonth"
          :key="day"
          class="day"
          :class="'day-' + getDayOfTheWeek(day)"
        >
          {{ day }}
        </div>

        <div
          v-for="day in 6 - getDayOfTheWeek(daysInMonth)"
          :key="day"
          class="day next-month"
          :class="'day-' + getDayOfTheWeekNextMonth(day)"
        >
          {{ day }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class DatePicker extends Vue.with(Props) {
  date: Date = new Date()
  monthDirection: number = 0

  get today(): Date {
    return new Date()
  }

  get month(): number {
    return new Date(this.date).getMonth()
  }

  get previousMonthDate(): Date {
    return new Date(this.year, this.month - 1)
  }

  get previousMonth(): number {
    return this.previousMonthDate.getMonth()
  }

  get nextMonthDate(): Date {
    return new Date(this.year, this.month + 1)
  }

  get nextMonth(): number {
    return this.nextMonthDate.getMonth()
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

  getDisplayDay(day: number): string {
    const days: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    return days[day]
  }

  get year(): number {
    return new Date(this.date).getFullYear()
  }

  get daysInMonth(): number {
    return 32 - new Date(this.year, this.month, 32).getDate()
  }

  get daysInNextMonth(): number {
    return 32 - new Date(this.year, this.nextMonth, 32).getDate()
  }

  get daysInPreviousMonth(): number {
    return 32 - new Date(this.year, this.previousMonth, 32).getDate()
  }

  incrementMonth() {
    this.date = new Date(this.year, this.month + 1)
    this.monthDirection = 1
  }

  decrementMonth() {
    this.date = new Date(this.year, this.month - 1)
    this.monthDirection = -1
  }

  getDayOfTheWeek(day: number): number {
    return new Date(this.year, this.month, day).getDay()
  }

  getDayOfTheWeekPreviousMonth(day: number): number {
    return new Date(
      this.previousMonthDate.getFullYear(),
      this.previousMonth,
      day
    ).getDay()
  }

  getDayOfTheWeekNextMonth(day: number): number {
    return new Date(
      this.nextMonthDate.getFullYear(),
      this.nextMonth,
      day
    ).getDay()
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/date-picker.scss';
</style>
