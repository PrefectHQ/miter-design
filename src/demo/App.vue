<template>
  <div class="pt-5 px-10 pb-10" v-cloak>
    <Cards />
    <Buttons class="mt-10" />
    <RadioButtons class="mt-10" />
    <Links class="mt-10" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from './sections/Buttons.vue'
import Cards from './sections/Cards.vue'
import RadioButtons from './sections/RadioButtons.vue'
import Links from './sections/Links.vue'

@Options({
  components: {
    Buttons,
    Cards,
    RadioButtons,
    Links
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
