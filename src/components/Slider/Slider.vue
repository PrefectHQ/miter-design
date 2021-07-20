<template>
  <input 
  type="range" 
  @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    @keydown.enter.space="handleKeydown"
    @keyup.enter.space="handleKeyup"
    @focus="handleFocus"
    @blur="handleBlur"
    :disabled="disabled" 
    :min="minVal" 
    :max="maxVal" 
    :step="stepVal"
    :value="modelValue"
    class="slider"
    :class="classList"
    :style="sliderVal"
    @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent ({
  name: 'Slider',  
  props: {
      disabled: {
          type: Boolean,
          default: false
      },
      minVal: {
          type: Number,
          default: 0
      },
      maxVal: {
          type: Number,
          default: 50
       },
       stepVal: {
           type: Number,
           default: 1
       },
       modelValue: {
           type: String,
           required: true
       } 
  },  
  emits: ['update:modelValue'],
  data() {
      return {
        active: false as boolean,
       
      }
  },
computed: {
    classList(): any {
     return this.disabled ?  ['disabled'] : this.active ? ['active'] :
     [] 
  },
  sliderVal(): object {
      const val = this.modelValue/(this.maxVal - this.minVal) * 100
      return {
          '--slider-val': `${val}%`
      }
  },
},
mounted(): void {
    return
},
methods: {
  handleMouseEnter(): void {
    if (this.disabled) return
    this.active=true
  },

  handleMouseLeave(): void {
    if (this.disabled) return
    this.active = false
  },

  handleMouseDown(): void {
    if (this.disabled) return
    this.active = true
  },

  handleMouseUp(): void {
    this.active = false
  },

  handleFocus(): void {
    if (this.disabled) return
    this.active=true
  },

  handleBlur(): void {
    this.active = false
  },

  handleKeyup(): void {
    this.active = false
  },

  handleKeydown(): void {
    if (this.disabled) return
    this.active = true
  }
}
})
</script>


<style lang="scss" scoped >
@use '../../styles/components/slider';
</style>
