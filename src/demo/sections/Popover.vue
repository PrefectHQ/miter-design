<template>
  <div style="margin-left: 400px; margin-top: 200px">
    <h5>Template/Teleport Version</h5>
    <Popover v-model="show" position="top" target="opener" :title="title">
      <template v-slot:activate>
        <Card
          width="400px"
          height="500px"
          class="mr-4 mt-4 d-inline-block"
          shadow="sm"
          tabindex="0"
          id="opener"
          @mouseenter="open"
          @keydown.enter="open"
        >
          Hello
        </Card>
      </template>

      <template v-slot:content>
        <div>
          <div class="d-flex justify-space-between"
            ><span>Date:</span><span>Aug 1, 2021</span></div
          ><div class="d-flex justify-space-between"
            ><span>Run Range:</span><span>1-58m</span></div
          ><div class="d-flex justify-space-between"
            ><span>Flow Runs:</span><span>20</span></div
          >
          <hr /><div class="d-flex justify-space-between"
            ><span>Average Latness:</span><span>3m</span></div
          ><div class="d-flex justify-space-between"
            ><span>Highest Range:</span><span>1-59m</span></div
          ><div class="d-flex justify-space-between"
            ><span>Lowest Range:</span><span>&gt;1d</span></div
          >
        </div>
        <div class="text-center mt-4">
          <Button color="primary" @click="handleClick">Click</Button>
          <Button color="primary" @click="close">Close</Button>
        </div>
      </template>
    </Popover>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popover from '@/components/Popover/Popover.vue'
export default defineComponent({
  components: { Popover },
  data() {
    return {
      position: 'top',
      title:
        '<span><i class="pi pi-user-smile-line pi-lg"></i> Flow Run Duration </span>',
      show: false,

      config: {
        position: 'top',
        content: 'content',
        title: 'Foo',
        show: false
      }
    }
  },
  methods: {
    handleClick() {
      console.log('clicked popover')
    },
    open() {
      this.show = true
    },
    close() {
      this.show = false
    }
  }
})
</script>

<style lang="scss" scoped></style>
