<template>
  <div>
    <h3>Toggle Switches</h3>

    <h5 class="mt-5">Toggle</h5>
    <div v-for="state in states" :key="state" class="my-2 d-flex">
      <span class="text-capitalize">{{ state.state }}:</span>
      <Toggle :disabled="state.state == 'disabled'" v-model="state.checked">
        <span>Label</span>
      </Toggle>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toggle from '@/components/Toggle/Toggle.vue'

export default defineComponent({
  name: 'Toggles',
  components: { Toggle },
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
@use '@/styles/components/toggle';
</style>
