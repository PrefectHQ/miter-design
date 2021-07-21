<template>
  <div
    class="tag"
    :class="classList"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
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
  hovered: boolean = false

  classList = computed(() => {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.icon ? ['icon'] : []),
      ...(this.selected ? ['selected'] : []),
      ...(this.hovered ? ['hovered'] : []),
      this.color
    ]
  })

  mounted(): void {
    return
  }

  handleMouseEnter(): void {
    if (this.disabled) return
    this.hovered = true
  }

  handleMouseLeave(): void {
    this.hovered = false
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
