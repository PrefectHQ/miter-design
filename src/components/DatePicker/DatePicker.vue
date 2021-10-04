<template>
  <div
    class="calendar"
    @keyup.right.stop="incrementMonth(true)"
    @keyup.left.stop="decrementMonth(true)"
    tabindex="0"
    ref="calendar"
  >
    <div class="calendar-header">
      <button
        class="month-button cursor-pointer"
        aria-label="Previous month"
        title="Previous month"
        data-test="previous"
        @click="() => decrementMonth()"
      >
        <i class="pi pi-arrow-left-s-line" />
      </button>

      <button
        class="month-button cursor-pointer"
        aria-label="Next month"
        data-test="next"
        title="Next month"
        @click="() => incrementMonth()"
      >
        <i class="pi pi-arrow-right-s-line" />
      </button>

      <div data-test="month" class="month-title ml-2">
        {{ displayMonth }} {{ year }}
      </div>

      <a
        v-if="showToday"
        data-test="today"
        class="today-link"
        role="button"
        tabindex="0"
        @click="resetDate"
        @keyup.enter.space="resetDate"
      >
        Today
      </a>
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

        <button
          v-for="day in Array.from({ length: getDayOfTheWeek(1) })
            .map((e, i) => daysInPreviousMonth - i)
            .reverse()"
          :key="day"
          class="day previous-month"
         :class="['day-' + getDayOfTheWeekPreviousMonth(day), {
            today: isToday(day, nextMonth, nextMonthYear)
          }]"
          @click="selectDate(day, previousMonth, previousMonthYear)"
        >
          {{ day }}
        </button>

        <button
          v-for="day in daysInMonth"
          :key="day"
          data-test="day"
          class="day"
          :class="{
            ['day-' + getDayOfTheWeek(day)]: true,
            today: isToday(day, month, year),
            'selected-day': isSelectedDay(day, month, year)
          }"
          @click="selectDate(day, month, year)"
        >
          {{ day }}
        </button>

        <button
          v-for="day in 6 - getDayOfTheWeek(daysInMonth)"
          :key="day"
          class="day next-month"
          :class="['day-' + getDayOfTheWeekNextMonth(day), {
            today: isToday(day, nextMonth, nextMonthYear)
          }]"
          @click="selectDate(day, nextMonth, nextMonthYear)"
        >
          {{ day }}
        </button>
      </div>
    </transition>
    <Timepicker />
    <div
      class="timepicker-actions"
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 24px;
        margin-top: 22px;
      "
    >
      <Button miter>Cancel</Button>
      <Button miter color="primary">Apply</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import Timepicker from '../Timepicker/Timepicker.vue'

class Props {
  /**
   * A reactive native JS DateTime Object (only the date portion is reactive)
   * @model
   */
  modelValue = prop<Date>({ required: false })
  /**
   * A native JS DateTime Object used to set the default value for the component
   */
  value = prop<Date>({ required: false })
}

const Component = Options
@Component({
  watch: {
    value_(val) {
      this.$emit('update:modelValue', val)
    },
    modelValue(val) {
      this.date = new Date(val)
    },
    value(val) {
      this.date = new Date(val)
    }
  },
  components: {
  Timepicker
}
})



/**
 * The DatePicker is meant to present a unified cross-browser date picking component, replacing native browser date pickers
 * which vary drastically browser to browser.
 *
 * @displayName DatePicker
 */
export default class DatePicker extends Vue.with(Props) {
  value_: Date = this.modelValue
    ? new Date(this.modelValue)
    : this.value
    ? new Date(this.value)
    : new Date()

  date: Date = new Date(this.value_)
  monthDirection: number = 0

  today = new Date()

  get previousMonthDate(): Date {
    return new Date(this.year, this.month - 1)
  }

  get previousMonth(): number {
    return this.previousMonthDate.getMonth()
  }

  get previousMonthYear(): number {
    return this.previousMonthDate.getFullYear()
  }

  get nextMonthDate(): Date {
    return new Date(this.year, this.month + 1)
  }

  get nextMonth(): number {
    return this.nextMonthDate.getMonth()
  }

  get nextMonthYear(): number {
    return this.nextMonthDate.getFullYear()
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

  get month(): number {
    return new Date(this.date).getMonth()
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

  get showToday(): boolean {
    return this.month !== this.today.getMonth()
  }

  resetDate(): void {
    const month = this.today.getMonth()
    const year = this.today.getFullYear()
    this.monthDirection =
      (month >= this.month && year >= this.year) ||
      (month < this.month && year > this.year)
        ? 1
        : -1

    this.value_ = new Date(this.today)
  }

  incrementMonth(focus?: boolean) {
    this.date = new Date(this.year, this.month + 1)
    this.monthDirection = 1

    if (focus) {
      this.focusElement()
    }
  }

  decrementMonth(focus?: boolean) {
    this.date = new Date(this.year, this.month - 1)
    this.monthDirection = -1
    if (focus) {
      this.focusElement()
    }
  }

  focusElement() {
    this.$nextTick(() => {
        ;(this.$refs.calendar as HTMLDivElement).focus()
      })
  }

  isToday(date: number, month: number, year: number): boolean {
    return (
      this.today.getMonth() == month &&
      this.today.getDate() == date &&
      this.today.getFullYear() == year
    )
  }

  isSelectedDay(date: number, month: number, year: number): boolean {
    return (
      this.value_.getMonth() == month &&
      this.value_.getDate() == date &&
      this.value_.getFullYear() == year
    )
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

  selectDate(date: number, month: number, year: number) {
    this.monthDirection =
      (month >= this.month && year >= this.year) ||
      (month < this.month && year > this.year)
        ? 1
        : -1
    this.value_ = new Date(year, month, date)
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/date-picker.scss';
</style>
