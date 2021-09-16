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
    <i v-if="icon" class="pi pi-sm" :class="iconClass"></i>
    <span v-else data-test="default"><slot /></span>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  icon = prop<string>({ default: '' })
  color = prop<string>({ default: 'secondary' })
  disabled = prop<boolean>({ default: false })
}

const Component = Options
@Component({})
export default class Button extends Vue.with(Props) {
  active: boolean = false
  hovered: boolean = false

  get classList(): string[] {
    return [
      ...(this.icon.length > 0 ? ['icon'] : ['miter']),
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...[this.color]
    ]
  }

  mounted(): void {
    return
  }

  get iconClass(): string | null {
    return this.icon.length > 0 ? `pi-${this.icon}` : null
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
