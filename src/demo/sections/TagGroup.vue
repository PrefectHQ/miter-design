<template>
  <div>
    <h3>Tag Group</h3>
    v-model:{{ tags }}
    <button @click="multiple = !multiple">multiple: {{ multiple }}</button>
    <button @click="mandatory = !mandatory">mandatory: {{ mandatory }}</button>

    <TagGroup v-model="tags" :multiple="multiple" :mandatory="mandatory">
      <Tag value="1" :color="'primary-hover'">One</Tag>
      <Tag value="2" :color="'primary'">Two</Tag>
    </TagGroup>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
@Options({})
export default class TagGroup extends Vue {
  tags = []
  multiple = false
  mandatory = false
  mounted(): void {
    return
  }
}
</script>
