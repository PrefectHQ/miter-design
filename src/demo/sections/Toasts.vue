<template>
  <div>
    <h3>Toasts</h3>
    <div class="my-2">
      <Button color="primary" @click="addToast">Add toast</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Toasts',
  data() {
    return {}
  },
  methods: {
    addToast() {
      console.log()
      console.log(this.$toast.add('some text'))
    }
  }
})
</script>

<style lang="scss" scoped></style>
