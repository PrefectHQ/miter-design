<template>
    <Button @click="handleClick">{{value}}</Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import Button from '@/components/Button/Button.vue'

export default defineComponent({
  name: 'Simple',
//   components: { Button },
  data() {
    return {
      value: 'hello'
    }
  },
  methods: {
      handleClick(e: Event) {
          console.log('clicked', e)
      }
    // handleInvalid(validityState: ValidityState) {
    //   console.log('validity', validityState)
    // }
  }
})
</script>