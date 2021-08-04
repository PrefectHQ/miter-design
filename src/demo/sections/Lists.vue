<template>
  <div>
    <h3>Lists</h3>
    <List
      class="my-2"
      name="list-without-icon"
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
      v-model="selected1"
    >
      <span>No Icon</span>
    </List>
    <List
      class="my-2"
      name="list-with-icon"
      icon
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
      v-model="selected2"
    >
      <span>With Icon</span>
    </List>
    <List
      class="my-2"
      name="list-disabled"
      placeholder="Pick something!"
      title="Available Options"
      :options="options"
      disabled
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
      selected1: '',
      selected2: '',
      options: ['First', 'Second', 'Third']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/list';
</style>
