<template>
  <div>
    <h3>Text Areas</h3>

    <div class="my-2 d-flex">
      <TextArea
        label="Text Area"
        subtitle="Additional Info"
        class="mr-2"
        required
        @invalid="handleInvalid"
      />
      <TextArea disabled hideLabel placeholder="can't write here" />
      <textarea />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TextArea from '@/components/TextArea/TextArea.vue'

export default defineComponent({
  name: 'TextAreas',
  components: { TextArea },
  methods: {
    handleInvalid(validityState: ValidityState) {
      console.log('validity', validityState)
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/textarea';
</style>
