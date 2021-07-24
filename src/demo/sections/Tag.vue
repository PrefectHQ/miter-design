<template>
  <div>
    <h3>Tags</h3>

    <h6>Click to toggle props</h6>
    <div>
      <button @click="color = color == 'primary' ? 'secondary' : 'primary'"
        >color:{{ color }}</button
      >
      <button @click="disabled = !disabled">disabled:{{ disabled }}</button>
      <button @click="outlined = !outlined">outlined:{{ outlined }}</button>
    </div>

    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>

      <Tag
        v-for="style in tagStyles"
        :key="style"
        class="ml-2 text-capitalize"
        :color="color"
        :disabled="disabled"
        :outlined="outlined"
      >
        <span v-if="tagStyles[1] == style" class="icon-style">
          <i class="material-icons">favorite</i>
          tag
        </span>
        <span v-else>tag</span>
      </Tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tag extends Vue {
  states = ['default', 'outlined', 'disabled']
  tagStyles = ['primary', 'secondary']
  color = 'primary'
  disabled = false
  outlined = false

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';

.icon-style > i {
  font-size: 11px;
}
</style>
