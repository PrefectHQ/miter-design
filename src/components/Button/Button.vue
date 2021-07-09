<template>
  <button class="cursor-pointer button" :class="classList">
    <div class="px-4">
      <span>
        <slot />
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({ default: 'secondary' })
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
