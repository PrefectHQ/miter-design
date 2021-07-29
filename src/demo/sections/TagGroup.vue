<template>
  <div>
    <h3>TagGroup</h3>

    <TagGroup v-model="tags">
      <Tag v-for="tag in tags" :key="tag" class="mr-2">{{ tag }}</Tag>
    </TagGroup>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class TagGroup extends Vue {
  tags = ['Work', 'Home Improvement', 'Vacation', 'Food']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped></style>
