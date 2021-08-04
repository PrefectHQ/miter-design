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
      <span>No Icon</span>
    </List>
    <List
      class="my-2"
      name="list-with-icon"
      label="i"
      icon="true"
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
    >
      <span>With Icon</span>
    </List>
    <List
      class="my-2"
      name="list-disabled"
      label="i"
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
      disabled="true"
    >
      <span>Disabled</span>
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
