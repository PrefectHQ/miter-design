<template>
  <div class="d-flex">
    <Card
      :key="index"
      class="mr-4 mt-4 d-inline-block"
      :class="card.cardClass"
      :height="card.height"
      :width="card.width"
    >
      <template v-if="card.headerTag" v-slot:header>
        <component
          :is="card.headerTag"
          :class="card.headerClass"
          :height="card.headerHeight"
        >
          {{ card.header }}
        </component>
      </template>

      <component
        v-if="card.overline"
        :is="card.overlineTag || 'div'"
        :class="card.overlineClass"
      >
        {{ card.overline }}
      </component>
      <component
        v-if="card.title"
        :is="card.titleTag || 'div'"
        :class="card.titleClass"
      >
        {{ card.title }}
      </component>
      <component
        v-if="card.subtitle"
        :is="card.subtitleTag || 'div'"
        :class="card.subtitleClass"
      >
        {{ card.subtitle }}
      </component>

      <template v-if="card.asideTag" v-slot:aside>
        <component
          :is="card.asideTag || 'div'"
          :class="card.asideClass"
          :width="card.asideWidth"
        >
          {{ card.aside }}
        </component>
      </template>

      <component
        v-if="card.content"
        :is="card.contentTag || 'div'"
        :class="card.contentClass"
      >
        {{ card.content }}
      </component>

      <template v-slot:actions>
        <component
          v-if="card.actions"
          :class="card.actionClass"
          :is="'CardActions'"
        >
          <component
            v-for="(action, index) in card.actions"
            :key="index"
            :is="action.tag"
            class="mr-2"
            :color="action.color"
            :disabled="action.disabled"
            :class="action.class"
          >
            {{ action.text }}
          </component>
        </component>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface event {
  target: {
    value: string
  }
}

export default defineComponent({
  name: 'Slider',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 50
    },
    step: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: ''
    },
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    classList(): any {
      return this.disabled ? ['disabled'] : this.active ? ['active'] : []
    },
    sliderVal(): object {
      const diff = this.max - this.min
      const val = this.internalValue
        ? ((parseFloat(this.internalValue) - this.min) / diff) * 100
        : 0
      return {
        '--slider-val': `${val}%`
      }
    },
    internalValue(): string {
      return this.value || this.modelValue || '0'
    }
  },
  methods: {
    handleInput(e: event) {
      this.$emit('update:modelValue', e.target.value)
    },
    handleMouseEnter(): void {
      if (this.disabled) return
      this.active = true
    },
    handleMouseLeave(): void {
      if (this.disabled) return
      this.active = false
    },
    handleMouseDown(): void {
      if (this.disabled) return
      this.active = true
    },
    handleMouseUp(): void {
      this.active = false
    },
    handleFocus(): void {
      if (this.disabled) return
      this.active = true
    },
    handleBlur(): void {
      this.active = false
    },
    handleKeyup(): void {
      this.active = false
    },
    handleKeydown(): void {
      if (this.disabled) return
      this.active = true
    }
  }
})
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
