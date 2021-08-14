<template>
  <div>
    <h3>Tag Group</h3>
    v-model:{{ tags }}

    <TagGroup v-model="tags" :multiple="true">
      <Tag value="1">One</Tag>
      <Tag value="2">Two</Tag>
      <Tag value="3">Three</Tag>
      <Tag value="4">Four</Tag>
    </TagGroup>

    <!-- <TagGroup v-model="tags"> </TagGroup> -->
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
@Options({})
export default class TagGroup extends Vue {
  tags = []
  mounted(): void {
    return
  }
}
</script>
