<template>
  <div>
    <h3>Inputs - Number</h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NumberInput from '@/components/NumberInput/NumberInput.vue'

export default defineComponent({
  name: 'NumberInput',
  components: { NumberInput },
  data() {
    return {
      selected: 'enabled',
      states: ['enabled', 'also enabled', 'disabled']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/input--number';
</style>
