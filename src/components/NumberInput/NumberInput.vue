<template>
  <div class="number-input-wrapper">
    <div>
      <input type="number" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class NumberInput extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@use '../../styles/components/input--number.scss';
</style>
