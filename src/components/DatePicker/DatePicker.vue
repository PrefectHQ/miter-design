<template>
  <div> I'm a date picker! </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

class Props {}

const Component = Options
@Component({})
export default class DatePicker extends Vue.with(Props) {}
</script>

<style lang="scss" scoped>
@use '../../styles/components/date-picker.scss';
</style>
