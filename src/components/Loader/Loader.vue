<template>
  <transition name="fade-loader">
    <div v-if="loading" class="loader" data-test="loader" />
  </transition>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  loading = prop<boolean>({ default: false })
}

const Component = Options
@Component({
  name: 'MLoader'
})
export default class MLoader extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@use '../../styles/components/loader';
</style>
