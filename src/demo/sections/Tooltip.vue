<template>
  <div>
    <Button v-tooltip="'I am tooltip'"> Button </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      right: false,
      left: false,
      bottom: false
    }
  }
})
</script>
<style>
.highlight {
  color: yellow;
  text-decoration: underline;
}
</style>
