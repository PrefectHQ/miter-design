<template>
  <div class="tags">
    <i v-if="icon" class="pi" :class="icon" />
    <Tag flat>
      {{ internalTags }}
      <template v-if="tagLengthLimit">
        <Tooltip  placement="bottom">
          <template v-slot:trigger>
            <span class="tags__showTooltip">show</span>
          </template>
          <span class="tags__tooltipTag">{{ jointTags }}</span>
        </Tooltip>
      </template>
    </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tag from "@/components/Tag/Tag.vue";
import Tooltip from "@/components/Tooltip/Tooltip.vue"

export default defineComponent({
  name: "TagList",
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
    limit: {
      type: Number,
      default: 30
    }
  },
  computed: {
    jointTags(): string {
      return this.tags?.join(", ")
    },
    tagLengthLimit(): boolean {
      return this.jointTags.length > this.limit
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

