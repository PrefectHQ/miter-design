<template>
  <button
    class="cursor-pointer button"
    :class="classList"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <div class="px-4">
      <span>
        <slot />
      </span>
    </div>
  </button>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  color = prop<string>({ default: 'secondary' })
}

@Options({})
export default class Button extends Vue.with(Props) {
  classList: Array<string> = [this.color]

  private addClass(className: string): void {
    if (!this.classList.includes(className)) {
      this.classList.push(className)
    }
  }

  private removeClass(className: string): void {
    this.classList = this.classList.filter((c) => c !== className)
  }

  mounted(): void {
    return
  }

  handleMouseEnter(): void {
    this.addClass('hovered')
  }

  handleMouseLeave(): void {
    this.removeClass('hovered')
  }

  handleMouseDown(): void {
    this.addClass('active')
  }

  handleMouseUp(): void {
    this.removeClass('active')
  }

  handleFocus(): void {
    this.addClass('hovered')
  }

  handleBlur(): void {
    this.removeClass('hovered')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
