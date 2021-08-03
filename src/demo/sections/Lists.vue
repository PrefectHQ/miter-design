<template>
  <div>
    <h3>Lists</h3>
    <List
      class="my-2"
      name="list-without-icon"
      label="i"
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
    >
      <span>{{ state }}</span>
    </List>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import List from '@/components/List/List.vue'

export default defineComponent({
  name: 'Lists',
  components: { List },
  data() {
    return {
      options: ['First', 'Second', 'Third']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/list';
</style>
