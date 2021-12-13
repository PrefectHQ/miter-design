<template>
  <div class="tags">
      <Tag v-for="tag in internalTags"
           :key="tag"
           v-bind="{icon, disabled, outlined, hovered, elevated, flat, color}"
           class="mr-1"
      >{{ tag }}</Tag>
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
  },
  computed: {
    internalTags() {
      return this.tags.length > 0 ? this.tags : ['--']
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tag';
</style>