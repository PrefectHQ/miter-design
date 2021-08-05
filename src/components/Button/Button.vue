<template>
  <button
    class="cursor-pointer button"
    :class="classList"
    :disabled="disabled"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div>
      <span data-test="default">
        <slot />
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({ default: 'secondary' })
  disabled = prop<boolean>({ default: false })
  icon = prop<boolean>({ default: false })
}

@Options({})
export default class Button extends Vue.with(Props) {
  active: boolean = false
  hovered: boolean = false

  get classList(): string[] {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...(this.icon ? ['icon'] : []),
      ...[this.color]
    ]
  }

  mounted(): void {
    return
  }

  /*

    Start input methods

  */
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
  /*

    End input methods

  */
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/button';
</style>
