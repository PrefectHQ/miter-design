<template>
  <div> I'm a simple select! </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class SimpleSelect extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@use '../../styles/components/simple-select.scss';
</style>
