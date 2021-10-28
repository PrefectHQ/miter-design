<template>
    <div class="select-content" tabindex="0" @keydown="keydown" @focusout="focusout">
      <slot name="before-options" />
      <div class="select-content__options">
        <template v-for="option in options" :key="option.label">
          <template v-if="isOptionGroup(option)">
            <OptionGroup v-bind="option" :selected="selected" @select="select">
              <template v-slot:label="scope">
                <slot name="option-group-label" v-bind="scope" />
              </template>
              <template v-slot:option-icon="scope">
                <slot name="option-icon" v-bind="scope" />
              </template>
              <template v-slot:option-label="scope">
                <slot name="option-label" v-bind="scope" />
              </template>
            </OptionGroup>
          </template>
          <template v-else>
            <Option v-bind="option" :selected="isOptionSelected(option, selected)" @select="select">
              <template v-slot:icon="scope">
                <slot name="option-icon" v-bind="scope" />
              </template>
              <template v-slot:label="scope">
                <slot name="option-label" v-bind="scope" />
              </template>
            </Option>
          </template>
        </template>
      </div>
    </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component'
import { Component } from '@/utilities/vue-class-component'
import OptionGroup from './OptionGroup.vue'
import Option from './Option.vue'
import { Options } from './types'
import { isOptionGroup, isOptionSelected } from './utilities'

class Props {
  options = prop<Options>({ default: () => ([]) })
  selected = prop({ default: null })
}

@Component({
  emits: ['select', 'blur'],
  components: {
    OptionGroup,
    Option
  }
})
export default class SelectContent extends Vue.with(Props) {

  private isOptionGroup = isOptionGroup
  private isOptionSelected = isOptionSelected

  private select(value: any) {
    this.$emit('select', value)
  }

  private keydown(event: KeyboardEvent) {
    // nav/select options
  }

  private focusout(event: FocusEvent) {
    this.$emit('blur')
  }

}
</script>

<style lang="scss">
@use '../../styles/abstracts/mixins';

.select-content {
  width: var(--select-width, 350px);
  max-height: calc(var(--select-height, 58px) * 6);
  background-color: #fff;
  overflow-y: auto;
  z-index: 1;

  @include mixins.drop-shadow;
}
</style>