<template>
  <div class="card-actions" :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  height = prop<string>({ default: null })
}

@Options({})
export default class Actions extends Vue.with(Props) {
  style = computed(() => {
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
@use '@/styles/components/card-actions';
</style>
