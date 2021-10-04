<template>
  <div>
    <h3>Date Picker</h3>

    <div class="my-4">
      <div class="mb-6">
        Value:
        <u
          >{{ date.getDate() }} {{ displayMonth }}
          {{ date.getFullYear() }}
        </u>
      </div>
      <DatePicker v-model="date" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import DatePicker from '@/components/DatePicker/DatePicker.vue'

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

export default defineComponent({
  name: 'Date Picker Section',
  components: { DatePicker },
  setup() {
    const date = ref(new Date())
    const displayMonth = computed(() => {
      return months[date.value.getMonth()]
    })
    return { date, displayMonth }
  }
})
</script>

<style lang="scss" scoped></style>
