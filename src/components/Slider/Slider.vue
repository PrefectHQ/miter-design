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
    v-model="val" 
    class="slider"
    :class="classList"
    :style="sliderVal"
    @input="$emit('sliderChange', val)" />
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
       valProp: {
           type: Number,
           default: 25
       } 
  },  
  emits: ['sliderChange'],
  data() {
      return {
        active: false as boolean,
        val: 0 as number,
       
      }
  },
  created() {
      this.val = this.valProp
  },
computed: {
    classList(): any {
     return this.disabled ?  ['disabled'] : this.active ? ['active'] :
     [] 
  },
  sliderVal(): object {
      const val = this.val/(this.maxVal - this.minVal) * 100
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
    this.active=true
    if (this.disabled) return
  },

  handleMouseLeave(): void {
    this.active = false
  },

  handleMouseDown(): void {
    if (this.disabled) return
    this.active = true
    console.log('classList', this.classList)
  },

  handleMouseUp(): void {
    if (this.disabled) return
    this.active = false
  },

  handleFocus(): void {
    this.active=true
    if (this.disabled) return
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
