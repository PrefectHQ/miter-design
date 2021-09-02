<template>
  <div>
    <Button v-tooltip:[position]="html"> Tag </Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      position: 'top',
      html: `<div>some <span class="highlight">text</span></div>`
    }
  }
})
</script>
<style>
.highlight {
  color: yellow;
}
</style>
