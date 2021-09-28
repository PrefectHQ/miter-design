<template>
  <div>
    <h3 class="mb-1">Loading</h3>

    <loading />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Loading from '@/components/Loading/Loading.vue'

export default defineComponent({
  components: { Loading },
})
</script>
