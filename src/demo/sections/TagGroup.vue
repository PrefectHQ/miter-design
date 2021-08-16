<template>
  <div>
    <h3>Tag Group</h3>
    v-model:{{ tags }}
    <button @click="multiple = !multiple">multiple: {{ multiple }}</button>

    <TagGroup v-model="tags" :multiple="multiple">
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
  multiple = false
  mounted(): void {
    return
  }
}
</script>
