<template>
  <div>
    <h3>Tabs</h3>

    <Tabs v-model="tab">
      <Tab href="1">Tab 1</Tab>
      <Tab href="2">Tab 2</Tab>
      <Tab href="3">Tab 3</Tab>
      <Tab href="4">Tab 4</Tab>
    </Tabs>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class TabSection extends Vue {
  tab = 1

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
