<template>
  <div>
    <h3>Tag Group</h3>
    v-model:{{ tags }}

    <TagGroup v-model="tags" :multiple="true">
      <Tag value="1" :color="'primary-101'">One</Tag>
      <Tag value="2" :color="'primary-100'">Two</Tag>
    </TagGroup>
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
