<template>
  <div>
    <h3 class="mb-2">Popover</h3>
    <Popover position="right">
      <template v-slot:header>
        <p class="ma-0"><i class="pi pi-user-smile-line pi-lg"></i> Flow Run Duration</p>
      </template>
      <template v-slot:trigger="{ toggle, open }">
        <Button id="opener" @keydown.enter="toggle" @mouseover="open">
          Popover
        </Button>
      </template>
      <template v-slot="{ close }">
        <div>
          <div class="d-flex justify-space-between">
            <span>Date:</span><span>Aug 1, 2021</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Run Range:</span><span>1-58m</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Flow Runs:</span><span>20</span>
          </div>
          <hr />
          <div class="d-flex justify-space-between">
            <span>Average Latness:</span><span>3m</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Highest Range:</span><span>1-59m</span>
          </div>
          <div class="d-flex justify-space-between">
            <span>Lowest Range:</span><span>&gt;1d</span>
          </div>
        </div>
        <div class="text-center mt-4">
          <Button class="mr-1" color="primary" @click="handleClick">Click</Button>
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
    }
  },
  methods: {
    handleClick() {
      console.log('clicked popover')
    }
  }
})
</script>

<style lang="scss" scoped></style>
