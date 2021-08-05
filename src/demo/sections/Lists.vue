<template>
  <div>
    <h3>Lists</h3>
    <div class="d-flex">
      <List
        class="my-2 pr-2"
        name="list-without-icon"
        placeholder="Pick something!"
        title="Available Options"
        :options="options"
        v-model="selected1"
      >
      </List>
      <List
        class="my-2 pr-2"
        name="list-with-icon"
        icon
        title="Available Options"
        :options="options"
        v-model="selected2"
      >
      </List>
      <List
        class="my-2"
        name="list-disabled"
        placeholder="You cannot choose here"
        title="Available Options"
        :options="options"
        disabled
      >
      </List>
    </div>
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
