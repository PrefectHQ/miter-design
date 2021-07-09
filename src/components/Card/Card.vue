<template>
  <div class="card" :style="style">
    <div>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  width = prop<string>({ default: null })
}

@Options({})
export default class Card extends Vue.with(Props) {
  style = computed(() => {
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
@use '@/styles/components/card';
</style>
