<template>
  <div> I'm a time picker! </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class TimeInput extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@use '../../styles/components/time-input.scss';
</style>
