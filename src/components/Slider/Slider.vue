<template>
  <input type="range" :min="min" :max="max" :value="value" />
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  color = prop<string>({ default: 'secondary' })
  disabled = prop<boolean>({ default: false })
}

@Options({})
export default class Slider extends Vue.with(Props) {
  active: boolean = false
  min: number = 0
  max: number = 50
  value: number = 25

  classList = computed(() => {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.active ? ['active'] : []),
      this.color
    ]
  })

  mounted(): void {
    return
  }

  /*
  
    Start input methods
  
  */
  handleMouseEnter(): void {
    if (this.disabled) return
  }

  handleMouseLeave(): void {
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
  }

  handleBlur(): void {
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
@use '../../styles/components/slider';
</style>
