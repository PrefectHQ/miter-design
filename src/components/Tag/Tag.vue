<template>
  <div class="tag" :class="classList">
    <div data-test="default">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  color = prop<string>({ default: 'secondary' })
  selected = prop<boolean>({ default: false })
  disabled = prop<boolean>({ default: false })
  icon = prop<boolean>({ default: false })
}

@Options({})
export default class Tag extends Vue.with(Props) {
  classList = computed(() => {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.icon ? ['icon'] : []),
      ...(this.selected ? ['selected'] : []),
      this.color
    ]
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
