<template>
  <div>
    <h3 class="mb-1">Loader</h3>

    <loader :loading="true" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loader from '@/components/Loader/Loader.vue'

export default defineComponent({
  components: { Loader },
})
</script>
