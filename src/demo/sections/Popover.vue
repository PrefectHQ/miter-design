<!-- 
<template>
  <button id="popover-target">I should open up the popover</button>
  <popover target="popover-target">Some content<button @click="methodOnComponent">Click</button></popover>
</template>

<script>
export default {
  methods: {
    methodOnComponent() { alert('hello') }
  }
}
</script>
-->

<template>
  <div style="margin-left: 400px; margin-top: 200px">
    <h3>Popover</h3>
    <!-- <h5> Directive version</h5>
    <Button v-popover:[config] style="margin-top: 50px">Button</Button> -->
    <h5>Template/Teleport Version</h5>
 <Popover v-model="show" position="top" target="opener" :title="title">
   <template v-slot:activate>
    <Tag id="opener" @mouseenter="open">popover</Tag>
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
import Content from './Content.vue'
import Popover from '@/components/Popover/Popover.vue'
export default defineComponent({
  components: { Content, Popover },
  data() {
    return {
      position: 'left',
      title: 'title',
      show: false,
      // config: {
      //   position: 'left',
      //   title:
      //     '<span><i class="pi pi-Calendar pi-2x" /> Flow Run Activity</span>',
      //   content: Content
      // }
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
