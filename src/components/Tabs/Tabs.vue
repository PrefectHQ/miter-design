<template>
  <div class="tabs-container">
    <slot>
      <Tab> Tab 1 </Tab>
      <Tab> Tab 2 </Tab>
    </slot>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import Tab from './Tab/Tab.vue'

class Props {
  dense = prop<boolean>({ default: false })
}

@Options({
  components: { Tab }
})
export default class Tabs extends Vue.with(Props) {
  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tabs';
</style>
