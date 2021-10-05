<template>
  <div>
    <h3>Time Picker</h3>

    <div class="my-4">
      <div class="mb-6">
        Value:
        <u>{{ date.toLocaleString() }}
        </u>
      </div>
      <TimePicker v-model="date" class="hello-world" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TimePicker from '@/components/TimePicker/TimePicker.vue'

export default defineComponent({
  name: 'Time Picker Section',
  components: { TimePicker },
  setup() {
    const date = ref(new Date())

    return { date }
  }
})
</script>

<style lang="scss" scoped></style>
