<template>
  <button
    class="cursor-pointer button"
    :class="classList"
    :disabled="disabled"
    :style="{ height: height, width: width }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <span data-test="default" :style="{ height: height, width: width }">
      <i v-if="icon" class="pi" :class="icon"></i>
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  icon = prop<string>({ default: '' })
  miter = prop<boolean>({ default: false, type: Boolean })
  color = prop<string>({ default: 'secondary' })
  flat = prop<boolean>({ default: false, type: Boolean })
  rounded = prop<boolean>({ default: false, type: Boolean })
  disabled = prop<boolean>({ default: false, type: Boolean })
  height = prop<string>({ default: '' })
  width = prop<string>({ default: '' })
}

const Component = Options
@Component({
  name: 'MButton'
})
export default class MButton extends Vue.with(Props) {
  active: boolean = false
  hovered: boolean = false

  get classList(): string[] {
    return [
      ...(this.icon.length > 0 ? ['icon'] : []),
      ...(this.miter ? ['miter'] : []),
      ...(this.disabled ? ['disabled'] : []),
      ...(this.hovered ? ['hovered'] : []),
      ...(this.active ? ['active'] : []),
      ...(this.flat ? ['flat'] : []),
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
