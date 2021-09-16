<template>
  <div style="margin-left: 400px; margin-top: 200px">
    <!-- <h3>Popover</h3> -->
    <Button v-popover:[config] style="margin-top: 50px">Button</Button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Popover',
  data() {
    return {
      config: {
        position: 'left',
        label: 'Label',
        content: "<div style='color: red;'>div</div>"
      }
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped></style>
