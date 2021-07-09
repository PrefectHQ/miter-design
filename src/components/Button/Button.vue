<template>
  <button class="py-1 px-2" :class="classList"><slot></slot></button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({ default: 'primary' })
}

@Options({})
export default class Button extends Vue.with(Props) {
  classList: Array<string> = [this.color]

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
