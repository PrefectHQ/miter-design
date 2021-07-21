<template>
  <div
    class="tag"
    :class="classList"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
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
  active: boolean = false
  hovered: boolean = false

  classList = computed(() => {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.icon ? ['icon'] : []),
      ...(this.selected ? ['selected'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
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
    this.active = false
  }

  handleMouseDown(): void {
    if (this.disabled) return
    this.active = true
  }

  handleMouseUp(): void {
    if (this.disabled) return
    this.active = false
  }

  handleFocus(): void {
    if (this.disabled) return
    this.hovered = true
  }

  handleBlur(): void {
    this.hovered = false
    this.active = false
  }

  handleKeyup(): void {
    this.active = false
  }

  handleKeydown(): void {
    if (this.disabled) return
    this.active = true
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
