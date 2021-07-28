<template>
  <div class="pt-5 px-10 pb-10" v-cloak>
    <Cards />
    <Buttons class="mt-10" />
    <Checkboxes />
    <Links class="mt-10" />
    <Avatar class="mt-10" />
    <Tag class="mt-10" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from './sections/Buttons.vue'
import Cards from './sections/Cards.vue'
import Checkboxes from './sections/Checkboxes.vue'
import Links from './sections/Links.vue'
import Avatar from './sections/Avatar.vue'
import Tag from './sections/Tag.vue'

@Options({
  components: {
    Buttons,
    Cards,
    Links,
    Avatar,
    Checkboxes,
    Tag
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
