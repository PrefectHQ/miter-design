<template>
  <div>
    <h3>Tags</h3>

    <h6>Click to toggle props</h6>
    <div>
      <button @click="disabled = !disabled">disabled:{{ disabled }}</button>
      <button @click="outlined = !outlined">outlined:{{ outlined }}</button>
      <button @click="shadow = !shadow">shadow:{{ shadow }}</button>
    </div>
    <Tag
      v-for="style in tagStyles"
      :key="style"
      class="mr-1 text-capitalize mt-2"
      :color="style"
      :disabled="disabled"
      :outlined="outlined"
      :shadow="shadow"
    >
      <span v-if="tagStyles[1] == style">
        <i class="pi pi-fire pi-1x"></i>

        tag
      </span>
      <span v-else>tag</span>
    </Tag>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tag extends Vue {
  tagStyles = ['primary', 'error']
  disabled = false
  outlined = false
  shadow = false

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>
