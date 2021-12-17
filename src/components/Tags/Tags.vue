<template>
  <div class="tags">
    <i v-if="icon" class="pi tags__icon" :class="icon" />
    <Tag flat>
      {{ internalTags }}
      <template v-if="tagAmountLimit">
        <Tooltip  placement="bottom">
          <template v-slot:trigger>
            ...<span class="tags__more-tooltip">{{hiddenTagsNumber}} more</span>
          </template>
          <span>{{ hiddenTags }}</span>
        </Tooltip>
      </template>
    </Tag>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
      type: Array as PropType<string[]>,
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
    hiddenTagsSlice(): string[] {
      return this.tags.slice(this.limit)
    },
    hiddenTags(): string {
      return this.hiddenTagsSlice.join(", ")
    },
    hiddenTagsNumber(): number {
      return this.hiddenTagsSlice.length
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
    vertical-align: center;
  }

  &__more-tooltip {
    color: var(--primary)
  }
}
</style>

