<template>
  <div>
    <h3>Radio Buttons</h3>

    <h5 class="mt-5">Radio</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Radio :disabled="state == 'disabled'" v-model:checked="checked[state]">
        <span>Label</span>
      </Radio>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Radio extends Vue {
  states = ['enabled', 'disabled']

  data() {
    return {
      checked: { enabled: false, disabled: false }
    }
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/radio';
</style>
