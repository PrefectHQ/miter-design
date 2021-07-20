<template>
  <div>
    <h3>Tabs</h3>

    <Tabs v-model:tab="tab"> </Tabs>

    <div v-if="tab == 1">Tab 1</div>
    <div v-else-if="tab == 2">Tab 2</div>
    <div v-else-if="tab == 3">Tab 3</div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tabs extends Vue {
  tab: number = 1

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
/* */
</style>
