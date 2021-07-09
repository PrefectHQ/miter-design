<template>
  <div v-cloak>
    <Button color="primary">Hello!</Button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {}
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
