<template>
  <!-- need to implement a native <select/> here as well for accesability -->
  <div class="select" ref="trigger" :class="classes.select" v-bind="$attrs">
    <div class="select__input" ref="input" tabindex="0" :class="classes.input" @click="click">
      <template v-if="showSelected">
        <OptionLabel :label="selectedOption?.label" :icon="selectedOption?.icon">
          <template v-slot:label="scope">
            <slot name="selected-option-label" v-bind="scope" />
          </template>
          <template v-slot:icon="scope">
            <slot name="selected-option-icon" v-bind="scope" />
          </template>
        </OptionLabel>
      </template>
      <template v-else>
        <span class="select__label">
          {{ label }}
        </span>
      </template>
      <i class="select__arrow pi pi-arrow-down-s-line pi-lg" />
    </div>
  </div>
  <teleport v-if="open" to="body">
    <SelectContent ref="content" class="select__content" :class="classes.content" :style="styles.content" :filter="term" v-bind="{ options, selected }" @select="select">
      <template v-slot:before-options v-if="showSearch">
        <Input v-model="term" class="select__search" :placeholder="searchPlaceholder">
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
import { calculateMostVisiblePlacement, calculatePlacementPositionStyles, Placement, PlacementPositionStyles } from '@/utilities/position'
import { nextTick } from 'vue'
import { Vue, prop } from 'vue-class-component'
import { Component } from '../../utilities/vue-class-component'
import OptionLabel from './OptionLabel.vue'
import SelectContent from './SelectContent.vue'
import { Options } from './types'
import { getOptionFromOptionsAndGroupsByValue } from './utilities'
import Input from '@/components/Input/Input.vue'

class Props {
  modelValue = prop<string | null>({ default: null })
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
    OptionLabel,
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
  private placement: Placement = 'top'
  private position: PlacementPositionStyles = {
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  }

  get selected() {
    return this.modelValue
  }

  set selected(value: string | null) {
    this.$emit('update:modelValue', value)
  }

  get selectedOption() {
    return getOptionFromOptionsAndGroupsByValue(this.options, this.selected)
  }

  get showSelected() {
    return this.selectedOption?.value !== undefined
  }

  get showSearch() {
    return this.search || this.search === ''
  }

  get classes() {
    return {
      select: {
        'select--open': this.open,
        'select--disabled': this.disabled || this.disabled === ''
      },
      input: {
        'select__input--open': this.open,
        'select__input--open-top': this.open && this.placement === 'top',
        'select__input--open-bottom': this.open && this.placement === 'bottom'
      },
      content: {
        'select__content--top': this.placement === 'top',
        'select__content--bottom': this.placement === 'bottom'
      }
    }
  }

  get styles() {
    return {
      content: {
        top: this.placement === 'bottom' ? this.position.top : null,
        bottom: this.placement === 'top' ? this.position.bottom : null,
        left: this.position.left
      }
    }
  }

  public mounted() {
    document.addEventListener('click', this.documentClick)
  }

  public unmounted() {
    document.removeEventListener('click', this.documentClick)
  }

  public async openSelect() {
    this.open = true

    await nextTick()

    const { placement } = calculateMostVisiblePlacement(this.$refs.trigger, this.$refs.content.$el, document.body, ['bottom', 'top'])

    this.placement = placement
    this.position = calculatePlacementPositionStyles(placement, this.$refs.trigger, this.$refs.content.$el, document.body)
  }

  public closeSelect() {
    this.open = false
  }

  public focus() {
    this.$refs.input.focus()
  }

  private select(value: string) {
    this.selected = value
    this.term = ''

    this.closeSelect()
    this.focus()
  }

  private click(event: MouseEvent) {
    if(this.disabled) {
      return
    }

    this.open ? this.closeSelect() : this.openSelect()
  }

  private documentClick(event: MouseEvent) {
    const target = event.target as HTMLElement
    const inContent = this.$refs.content?.$el?.contains(target)
    const inTrigger = this.$refs.trigger.contains(target)

    if(!inContent && !inTrigger) {
      this.closeSelect()
    }
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

.select--open {
  @include mixins.drop-shadow;
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
  color: #{variables.$grey-20};
}

.select__arrow {
  margin-left: auto;
}

.select__search {
  position: sticky;
  top: 0;
  background-color: #fff;
  padding-left: 20px;
}

.select__content {
  position: absolute;
  z-index: 1;

  @include mixins.drop-shadow;
}

.select__content--top {
  transform: translateY(-2px);
}

.select__content--bottom {
  transform: translateY(2px);
}
</style>