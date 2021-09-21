<template>
  <button
    class="cursor-pointer button icon-button"
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
    <i class="pi pi-sm" :class="iconClass"></i>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  icon = prop<string>({ default: '' })
  disabled = prop<boolean>({ default: false })
  rounded = prop<boolean>({ default: false })
  flat = prop<boolean>({ default: false })
  color = prop<string>({ default: 'secondary' })
}

const Component = Options
@Component({})
export default class IconButton extends Vue.with(Props) {
  active: boolean = false
  hovered: boolean = false

  get classList(): string[] {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...(this.rounded ? ['rounded'] : []),
      ...(this.flat ? ['flat'] : []),
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
