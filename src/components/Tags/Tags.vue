<template>
  <div class="tags">
    <i v-if="icon" class="pi tags__icon" :class="icon" />
    <Tag flat>
      {{ internalTags }}
      <template v-if="tagAmountLimit">
        <Tooltip  placement="bottom">
          <template v-slot:trigger>
            ...<span class="tags__moreTooltip">{{hiddenTagsNumber}} more</span>
          </template>
          <span class="tags__tooltipTag">{{ hiddenTags }}</span>
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
  name: "Tags",
  components: { Tag, Tooltip },
  props: {
    icon: {
      type: String,
      default: "pi-label"
    },
    tags: {
      type: Array,
      default: function () { return [] }
    },
    limit: {
      type: Number,
      default: 4
    }
  },
  computed: {
    tagAmountLimit(): boolean {
      return this.tags.length > this.limit
    },
    visibleTags(): string {
      return this.tags.slice(0, this.limit).join(", ")
    },
    hiddenTags(): string {
      return this.tags.slice(this.limit).join(", ")
    },
    hiddenTagsNumber(): number {
      return this.tags.slice(this.limit).length
    },
    internalTags(): string {
      if(this.tags.length === 0) {
        return '--'
      }
      return this.visibleTags
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/_variables.scss';

.tags {
  display: flex;
  align-items: center;
  gap: var(--m-1);

  &__icon {
    color: var(--grey-20);
    vertical-align: center !important;
  }

  &__moreTooltip {
    color: var(--primary)
  }

  &__tooltipTag {
    font-family: variables.$font--secondary!important;
    line-height: 18px;
    letter-spacing: -0.09px;
    padding: 8px 16px 8px 16px;
  }
}
</style>

