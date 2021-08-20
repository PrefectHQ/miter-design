<template>
  <div>
    <h3>Selects</h3>
    <div class="d-flex">
      <Select
        class="my-2 mr-2"
        name="without-icon"
        :options="options"
        v-model="selected1"
      >
      </Select>
      <Select
        class="my-2 mr-2"
        name="with-icon"
        icon="Face-ID"
        placeholder="This one has icons!"
        title="Available Options"
        search
        openUp
        :options="options"
        v-model="selected2"
      >
      </Select>
      <Select
        class="my-2"
        name="disabled"
        placeholder="You cannot choose here"
        disabled
      >
      </Select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Select from '@/components/Select/Select.vue'

export default defineComponent({
  name: 'Selects',
  components: { Select },
  data() {
    return {
      selected1: '',
      selected2: '',
      options: ['First', 'Second', 'Third']
    }
  }
})
</script>
