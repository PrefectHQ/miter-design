<template>
    <div v-if="tags.length > 0">
      <Tag v-for="tag in tags"
           :key="tag"
           :icon="icon"
           :disabled="disabled"
           :outlined="outlined"
           :hovered="hovered"
           :elevated="elevated"
           :flat="flat"
           :color="color"
           class="mr-1"
      >{{ tag }}</Tag>
    </div>
    <div v-else class="tag d-flex mr-1" >
      <Tag
          :icon="icon"
          :disabled="disabled"
          :outlined="outlined"
          :elevated="elevated"
          :hovered="hovered"
          :color="color"
          :flat="flat"
          class="mr-1"
      >--</Tag>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import Tag from "@/components/Tag/Tag.vue";
export default defineComponent( {
  name: "Tags",
  components: {Tag},
  props: {
    icon: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    elevated: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    hovered: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>