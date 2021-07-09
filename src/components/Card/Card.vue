<template>
  <div class="card">
    <div :style="style">
      <slot />

      <div class="actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  height = prop<string>({ default: null })
  width = prop<string>({ default: null })
}

@Options({})
export default class Card extends Vue.with(Props) {
  style = computed(() => {
    return {
      height: this.height,
      width: this.width
    }
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/card';
</style>
