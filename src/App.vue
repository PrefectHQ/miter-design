<template>
  <div v-cloak>
    <Buttons class="ma-2" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from '@/sections/Buttons.vue'

@Options({
  components: {
    Buttons
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
