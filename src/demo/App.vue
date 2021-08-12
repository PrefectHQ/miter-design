<template>
  <div class="pt-5 px-10 pb-10" v-cloak>
    <div>
      <router-link class="mr-4" to="/">Components</router-link>
      <router-link to="/icons">Icons</router-link>
    </div>

    <router-view />
    <div id="modal-area"></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
