<template>
  <Tabs v-model="tab">
    <Tab href="tab_1">Tab 1</Tab>
    <Tab href="tab_2">Tab 2</Tab>
    <Tab href="tab_3">Tab 3</Tab>
    <Tab href="tab_4">Tab 4</Tab>
  </Tabs>

  <button @click="changeTabs">Change tabs</button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tab = ref('tab_1')

const changeTabs = () => {
  if(tab.value == 'tab_1') {
    tab.value = 'tab_2'
  } else if(tab.value == 'tab_2')
  {
    tab.value = 'tab_3'
  }else if(tab.value == 'tab_3')
  {
    tab.value = 'tab_4'
  }else if(tab.value == 'tab_4')
  {
    tab.value = 'tab_1'
  }
  //tab.value = tab.value == 'tab_1' ? 'tab_2' : 'tab_1'
}
</script>