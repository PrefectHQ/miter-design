<template>
  <!-- need to implement a native <select/> here as well for accesability -->
  <div class="select" ref="trigger" :class="classes.select" v-bind="$attrs">
    <div class="select__input" ref="input" tabindex="0" :class="classes.input" @click="click" @blur="blur" @keydown="keydown">
      <span class="select__label" :class="classes.label">
        <slot name="label">
          {{ valueLabelOrInputLabel }}
        </slot>
      </span>
      <i class="select__arrow pi pi-arrow-down-s-line pi-lg" :class="classes.arrow" />
    </div>
  </div>
  <teleport v-if="open" to="body">
    <SelectContent ref="content" class="select__content" :style="position" :options="searchedOptions" :selected="modelValue" @select="select">
      <template v-slot:before-options v-if="showSearch">
        <Input v-model="term" class="select__search" :placeholder="searchPlaceholder" @blur="blur">
          <template v-slot:prepend>
            <i class="pi pi-xs pi-search-line" />
          </template>
        </Input>
      </template>
      <template v-slot:label="scope">
        <slot name="option-group-label" v-bind="scope" />
      </template>
      <template v-slot:option-icon="scope">
        <slot name="option-icon" v-bind="scope" />
      </template>
      <template v-slot:option-label="scope">
        <slot name="option-label" v-bind="scope" />
      </template>
    </SelectContent>
  </teleport>
</template>

<script lang="ts">
import { calculateMostVisiblePlacementPositionStyles, PlacementPositionStyles } from '@/utilities/position'
import { nextTick } from 'vue'
import { Vue, prop } from 'vue-class-component'
import { Component } from '../../utilities/vue-class-component'
import SelectContent from './SelectContent.vue'
import { Options } from './types'
import { getOptionsFromOptionsAndGroups, searchOptionsAndGroups } from './utilities'
import Input from '@/components/Input/Input.vue'

class Props {
  modelValue = prop({ default: null })
  label = prop<string>({ default: 'Choose an Option' })
  options = prop<Options>({ default: () => ([]) })
  disabled = prop<boolean | string>({ default: false })
  search = prop<boolean | string>({ default: false })
  searchPlaceholder = prop<string>({ default: 'Search by name' })
}

@Component({
  emits: ['update:modelValue'],
  name: 'Select',
  components: {
    SelectContent,
    Input
  }
})
export default class Select extends Vue.with(Props) {

  $refs!: {
    trigger: HTMLDivElement
    input: HTMLDivElement
    content: SelectContent
  }

  private open: boolean = false
  private term: string = ''
  private position: PlacementPositionStyles = {
    left: '0px',
    top: '0px'
  }

  get selected() {
    return this.modelValue !== null
  }

  get showSearch() {
    return this.search || this.search === ''
  }

  get valueLabelOrInputLabel() {
    return this.selectedOption?.label ?? this.label
  }

  get selectedOption() {
    if(!this.selected) {
      return null
    }

    const allOptions = getOptionsFromOptionsAndGroups(this.options)

    return allOptions.find(option => option.value === this.modelValue)
  }

  get searchedOptions() {
    if(!this.showSearch || this.term.length == 0) {
      return this.options
    }

    return searchOptionsAndGroups(this.options, this.term)
  }

  get classes() {
    return {
      select: {
        'select--open': this.open,
        'select--disabled': this.disabled || this.disabled === ''
      },
      input: {
        'select__input--open': this.open
      },
      label: {
        'select__label--selected': this.selected
      },
      arrow: {
        'select__arrow--open': this.open
      }
    }
  }

  public async openSelect() {
    this.open = true

    await nextTick()

    // convert position methods to accept an argument object
    this.position = calculateMostVisiblePlacementPositionStyles(this.$refs.trigger, this.$refs.content.$el, document.body, ['bottom', 'top'])
  }

  public closeSelect() {
    this.open = false
  }

  public focus() {
    this.$refs.input.focus()
  }

  private select(value: any) {
    this.$emit('update:modelValue', value)

    this.closeSelect()
    this.focus()
  }

  private click(event: MouseEvent) {
    if(this.disabled) {
      return
    }

    this.open ? this.closeSelect() : this.openSelect()
  }

  private blur(event: FocusEvent) {
    const related = event.relatedTarget as HTMLElement
    const inContent = this.$refs.content?.$el?.contains(related)
    const inTrigger = this.$refs.trigger.contains(related)

    if(!inContent && !inTrigger) {
      this.closeSelect()
    }
  }

  private keydown(event: KeyboardEvent) {
    // open the menu
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/variables';
@use '../../styles/abstracts/mixins';

.select {
  --select-background-color: #fff;
  --select-cursor: pointer;
  --select-width: 350px;
  --select-height: 58px;
  --miter-width: 16px;

  width: var(--select-width);
  height: var(--select-height);
  user-select: none;
}

.select--open,
.select:focus-within {
  --miter-border-color: #{variables.$primary};
}

.select--disabled {
  --select-background-color: #{variables.$disabled};
  --select-cursor: not-allowed;
}

.select__input {
  background-color: var(--select-background-color);
  cursor: var(--select-cursor);
  height: inherit;
  display: flex;
  align-items: center;
  padding: 0 20px;

  @include mixins.miter-bordered-rounded;
}

.select__label {
  margin-right: auto;
  color: #{variables.$grey-20};
}

.select__label--selected {
  color: #{variables.$text--primary}
}

.select__search {
  padding-left: 20px;
}

.select__content {
  position: absolute;
}
</style>