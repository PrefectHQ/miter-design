<template>
  <div class="tags">
    <i v-if="icon" class="pi" :class="icon" />
    <Tag v-bind="{disabled, outlined, hovered, elevated, flat, color}">
      {{ internalTags }}
      <Tooltip v-if="tagLengthLimit" placement="bottom">
        <template v-slot:trigger>
          <span class="tags__showTooltip">show</span>
        </template>
        <span class="tags__tooltipTag">{{jointTags}}</span>
      </Tooltip>
    </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tag from "@/components/Tag/Tag.vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue"

export default defineComponent({
  name: "TagsList",
  components: { Tag, Tooltip },
  props: {
    icon: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: function () { return [] }
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
    jointTags(): string {
      return this.tags?.join(", ")
    },
    tagLengthLimit(): boolean {
      return this.jointTags.length > 30
    },
    internalTags(): string {
      if(this.tags.length > 0) {
        if(this.tagLengthLimit) {
          return `${this.tags.length} Tags...`
        }
        return this.jointTags
      }
      return "--"
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/abstracts/_variables.scss';

.tags {
  display: flex;
  align-items: center;
  gap: var(--m-1);

  i {
    color: variables.$grey-20;
    vertical-align: center !important;
  }

  &__showTooltip {
    color: variables.$primary;
  }

  &__tooltipTag {
    font-family: variables.$font--secondary!important;
    line-height: 18px;
    letter-spacing: -0.09px;
    padding: 8px 16px 8px 16px;
  }
}
</style>

