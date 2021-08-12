<template>
  <div>
    <h3>Tag Group</h3>
    v-model:{{ tagArr }}

    <TagGroup v-model="tagArr" :multple="true">
      <Tag value="1">One</Tag>
      <Tag value="2">Two</Tag>
    </TagGroup>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
@Options({})
export default class TagGroup extends Vue {
  tag = 1
  tagArr = []
  mounted(): void {
    return
  }
}
</script>
