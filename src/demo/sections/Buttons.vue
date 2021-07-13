<template>
  <div>
    <h3>Buttons</h3>

    <h5 class="mt-5">Block</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Button
        v-for="style in buttonStyles"
        :key="style"
        class="ml-2 text-capitalize"
        :color="style"
        :disabled="state == 'disabled'"
        @click="handleClick"
      >
        <span>{{ style }}</span>
      </Button>
    </div>

    <h5 class="mt-5">Icon</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Button
        v-for="style in buttonStyles"
        :key="style"
        class="ml-2"
        :color="style"
        :icon="true"
        :disabled="state == 'disabled'"
        @click="handleClick"
      >
        <i class="material-icons">add_task</i>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Buttons extends Vue {
  states = ['default', 'disabled']

  buttonStyles = ['primary', 'secondary', 'outlined']
  fabStyles = ['primary', 'secondary', 'outlined']

  mounted(): void {
    return
  }

  handleClick(): void {
    // eslint-disable-next-line no-console
    console.log('clicked!')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
