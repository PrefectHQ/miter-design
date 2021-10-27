<template>
  <div>
    <h3 style="margin-bottom: 10px">Tooltip</h3>
    <p>Directive</p>
    <Tag v-tooltip:[placement]="content"> Text </Tag>

    <p>Component</p>
    <Tooltip placement="right" style="display: inline-block;">
      <template v-slot:trigger>
        <Tag>Text</Tag>
      </template>
      <p class="ma-0">hello <strong> world!</strong></p>
    </Tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

export default defineComponent({
  components: {
    Tooltip
  },
  data() {
    return {
      placement: 'right',
      content: `hello world`
    }
  }
})
</script>
<style></style>
