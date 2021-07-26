<template>
  <div>
    <Avatar> NS </Avatar>
    <Avatar>
      <i class="pi pi-fire pi-1x"></i>
    </Avatar>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Avatar extends Vue {
  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/avatar';
</style>
