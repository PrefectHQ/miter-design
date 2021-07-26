<template>
  <div class="avatar" :class="classList">
    <span data-test="default">
      <slot />
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  color = prop<string>({ default: 'secondary' })
}

@Options({})
export default class Avatar extends Vue.with(Props) {
  classList = computed(() => {
    return [this.color]
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/avatar';
</style>
