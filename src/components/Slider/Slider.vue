<template>
  <input type="range" :min="minVal" :max="maxVal" v-model="val" @input="$emit('sliderChange', val)" />
</template>

<script lang="ts">
// import { Vue, Options, prop } from 'vue-class-component'
import { defineComponent } from 'vue'


// class Props {
//   color = prop<string>({ default: 'secondary' })
//   disabled = prop<boolean>({ default: false })
// }

export default defineComponent ({
  name: 'Slider',  
  props: {
      color: {
          type: String,
          default: 'secondary'
      },
      disabled: {
          type: Boolean,
          default: false
      }
  },  
  emits: ['sliderChange'],
  data() {
      return {
        active: false as boolean,
        minVal: 0 as number,
        maxVal: 50 as number,
        val:10 as number
      }
  },
computed: {
    classList(): String[] {
    return [
      ...(this.disabled ? ['disabled'] : []),
      ...(this.active ? ['active'] : []),
      this.color
    ]
  }
},
mounted(): void {
    return
},

  /*
  
    Start input methods
  
  */


methods: {
  handleChange(): void {
    console.log('val', this.val)
    this.$emit('sliderChange', this.val)
  },

  handleMouseEnter(): void {
    console.log('enter')
    if (this.disabled) return
  },

  handleMouseLeave(): void {
    this.active = false
  },

  handleMouseDown(): void {
    if (this.disabled) return
    this.active = true
  },

  handleMouseUp(): void {
    if (this.disabled) return
    this.active = false
  },

  handleFocus(): void {
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
  /*
  
    End input methods
  
  */
}
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/slider';
</style>
