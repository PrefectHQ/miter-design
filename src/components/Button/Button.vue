<template>
  <button class="cursor-pointer button" :class="classList">
    <div class="px-2">
      <slot></slot>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  style = prop<string>({ default: 'primary' })
}

@Options({})
export default class Button extends Vue.with(Props) {
  classList: Array<string> = [this.style]

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
