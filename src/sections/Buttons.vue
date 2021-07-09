<template>
  <div>
    <h3>Buttons</h3>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Button
        v-for="style in styles"
        :key="style"
        class="ml-2 text-capitalize"
        :color="style"
        :disabled="state == 'disabled'"
        :icon="state == 'icon'"
        @click="handleClick"
      >
        {{ style }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Button extends Vue {
  styles = ['primary', 'secondary', 'outlined']
  states = ['default', 'disabled', 'icon']

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
