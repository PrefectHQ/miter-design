<template>
  <div>
    <h3>Text Areas</h3>

    <div class="my-2">
      <TextArea
        label="Text Area"
        subtitle="Additional Info"
        class="mb-2"
        required
        v-model="value"
        @invalid="handleInvalid"
      >
        <template v-slot:error>No!</template>
      </TextArea>
      <TextArea v-model="value" disabled placeholder="can't write here" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextArea from '@/components/TextArea/TextArea.vue'

export default defineComponent({
  name: 'TextAreas',
  components: { TextArea },
  data() {
    return {
      value: ''
    }
  },
  methods: {
    handleInvalid(validityState: ValidityState) {
      console.log('validity', validityState)
    }
  }
})
</script>
