<template>
  <div>
    <h3>Radio Buttons</h3>

    <h5 class="mt-5">Radio</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state.state }}:</span>
      <RadioButton
        :disabled="state.state == 'disabled'"
        v-model="state.checked"
      >
        <span>Label</span>
      </RadioButton>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import RadioButton from '@/components/Radio/RadioButton.vue'

export default defineComponent({
  name: 'RadioButtons',
  components: { RadioButton },
  data() {
    return {
      states: [
        { state: 'enabled', checked: false },
        { state: 'disabled', checked: false }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/radio';
</style>
