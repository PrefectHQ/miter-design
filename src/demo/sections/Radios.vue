<template>
  <div>
    <h3>Radio Buttons</h3>
    <h5 class="mt-5">Radio</h5>
    <Radio
      v-for="(state, i) in states"
      :key="i"
      class="d-inline-block my-2"
      name="button-group"
      :disabled="state == 'disabled'"
      :label="i"
      :value="state"
      :checked="selected == state"
      v-model="selected"
    >
      <span>{{ state }}</span>
    </Radio>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Radios',
  data() {
    return {
      selected: 'enabled',
      states: ['enabled', 'also enabled', 'disabled']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/radio';
</style>
