<template>
  <div class="card-aside" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed, ComputedRef } from 'vue'

class Props {
  width = prop<string>({ default: null })
}

@Options({})
export default class Aside extends Vue.with(Props) {
  style: ComputedRef<{ [key: string]: string }> = computed(() => {
    return {
      width: this.width
    }
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../../styles/components/card-aside';
</style>
