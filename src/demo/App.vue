<template>
  <div class="pt-5 px-10 pb-10" v-cloak>
    <div class="miter"><div>TEST</div></div>

    <Cards />
    <Buttons class="mt-10" />
    <RadioButtons class="mt-10" />
    <Checkboxes />
    <Links class="mt-10" />
    <Tag class="mt-10" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from './sections/Buttons.vue'
import Cards from './sections/Cards.vue'
import RadioButtons from './sections/RadioButtons.vue'
import Checkboxes from './sections/Checkboxes.vue'
import Links from './sections/Links.vue'
import Tag from './sections/Tag.vue'

@Options({
  components: {
    Buttons,
    Cards,
    RadioButtons,
    Links,
    Checkboxes,
    Tag
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@use '../styles/abstracts/_mixins';
@use '../styles/abstracts/variables';
[v-cloak] {
  display: none;
}
.miter {
  height: 200px;
  width: 300px;
  @include mixins.miter-on-hover(4);
  @include mixins.miter-border(1, pink);
  @include mixins.miter-interactive;
}
</style>
