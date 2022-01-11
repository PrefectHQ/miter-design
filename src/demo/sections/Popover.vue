<template>
  <div>
    <h3 class="mb-2">Popover</h3>
    <div style="display: flex">
      <Popover position="right">
        <template v-slot:header>
          <p class="ma-0 d-inline-flex align-center"
            ><i class="pi pi-user-smile-line pi-lg mr-1"></i> Flow Run
            Duration</p
          >
        </template>
        <template v-slot:trigger="{ toggle, open }">
          <Button @keydown.enter="toggle" @mouseover="open"> Popover </Button>
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
            <Button
              class="mr-1"
              color="secondary light"
              miter
              height="36px"
              @click="close"
              >Cancel</Button
            >
            <Button color="primary" miter height="36px" @click="handleClick"
              >Click</Button
            >
          </div>
        </template>
      </Popover>
    </div>
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
