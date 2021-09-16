<template>
  <div>
    <h3 style="margin-bottom: 10px">Tooltip</h3>
    <Tag v-tooltip:[position]="val" Text > </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue'
import Simple from './simple.vue'


export default defineComponent({
  components: {
    Simple
  },
  data() {
    return {
      position: 'right',
      text: 'hello',
      val: Simple
    }
  }
})
</script>
<style></style>
