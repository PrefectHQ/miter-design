<template>
  <div>
    <h3>Tags</h3>
    <h5 class="mt-5">Block</h5>
    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Tag
        v-for="style in tagStyles"
        :key="style"
        class="ml-2 text-capitalize"
        :color="style"
        :disabled="state == 'disabled'"
        :selected="state == 'selected'"
      >
        <span v-if="tagStyles[1] == style" class="icon-style">
          <i class="material-icons">favorite</i>
          tag
        </span>

        <span v-else>tag</span>
      </Tag>
    </div>

    <h5 class="mt-5">Icon</h5>

    <div v-for="state in states" :key="state" class="my-2">
      <span class="font-weight-light text-capitalize">{{ state }}:</span>
      <Tag
        v-for="style in tagStyles"
        :key="style"
        class="ml-2 text-capitalize"
        :color="style"
        :disabled="state == 'disabled'"
        :selected="state == 'selected'"
        :icon="true"
      >
        <span class="icon-style"><i class="material-icons">favorite</i></span>
      </Tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tag extends Vue {
  states = ['default', 'selected', 'disabled']
  tagStyles = ['primary', 'secondary', 'default']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';

.icon-style > i {
  font-size: 14px;
  margin-right: 5.33px;
}
</style>
