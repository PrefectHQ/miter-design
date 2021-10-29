<template>
  <div class="select-content" tabindex="0" @keydown="keydown">
    <slot name="before-options" />
    <div class="select-content__options">
      <template v-for="option in options" :key="option.label">
        <template v-if="isOptionGroup(option)">
          <OptionGroup v-bind="{ filter, selected, ...option }" @select="select">
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
          <Option v-show="isOptionVisible(option, filter)" v-bind="option" :selected="isOptionSelected(option, selected)" @select="select">
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
import { isOptionGroup, isOptionSelected, isOptionVisible } from './utilities'

class Props {
  options = prop<Options>({ default: () => ([]) })
  selected = prop({ default: null })
  filter = prop<string>({ default: '' })
}

@Component({
  emits: ['select', 'blur'],
  components: {
    OptionGroup,
    Option
  }
})
export default class SelectContent extends Vue.with(Props) {

  $el!: HTMLDivElement

  private isOptionGroup = isOptionGroup
  private isOptionSelected = isOptionSelected
  private isOptionVisible = isOptionVisible

  public mounted() {
    const selected = this.$el.querySelector<HTMLElement>('.option--selected')
    
    if(selected?.offsetTop) {
        this.$el.scrollTop = selected.offsetTop - this.$el.offsetHeight / 2
    }
  }

  private select(value: any) {
    this.$emit('select', value)
  }

  private keydown(event: KeyboardEvent) {
    // nav/select options
  }

}
</script>

<style lang="scss">

.select-content {
  width: var(--select-width, 350px);
  background-color: #fff;
  border: 1px solid var(--miter-border-color);
  border-radius: 3px;
  max-height: calc(var(--select-height, 58px) * 6);
  overflow-y: auto;
}

</style>