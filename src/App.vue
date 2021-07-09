<template>
  <div v-cloak>
    <Cards class="ma-2" />
    <Buttons class="ma-2 mt-10" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from '@/sections/Buttons.vue'
import Cards from '@/sections/Cards.vue'

@Options({
  components: {
    Buttons,
    Cards
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
