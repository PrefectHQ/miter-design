<template>
  <div class="card-header" :style="style">
    <!-- :style="style" -->
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed, ComputedRef } from 'vue'
// import {StyleValue} from ''

class Props {
  height = prop<string>({ default: null })
}

@Options({})
export default class Header extends Vue.with(Props) {
  style: ComputedRef<{ [key: string]: string }> = computed(() => {
    return {
      height: this.height
    }
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../../styles/components/card-header';
</style>
