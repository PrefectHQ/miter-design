<template>
  <div class="select" ref="trigger" :class="classes.select" v-bind="$attrs">
    <NativeSelect ref="input" v-model="selected" v-bind="{ options, disabled }" />
    <div class="select__input" :class="classes.input" @click="click">
      <template v-if="isSelected">
        <OptionLabel v-bind="selectedOption">
          <template v-slot:label="scope">
            <slot name="selected-option-label" v-bind="scope" />
          </template>
          <template v-slot:icon="scope">
            <slot name="selected-option-icon" v-bind="scope" />
          </template>
        </OptionLabel>
      </template>
      <template v-else>
        <span class="select__placeholder">
          {{ placeholder }}
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
import { calculateMostVisiblePlacement, calculatePlacementPositionStyles, Placement, PlacementPositionStyles, defaultPositionStyles } from '@/utilities/position'
import { nextTick } from 'vue'
import { Vue, prop } from 'vue-class-component'
import { Component } from '../../utilities/vue-class-component'
import NativeSelect from './NativeSelect.vue'
import OptionLabel from './OptionLabel.vue'
import SelectContent from './SelectContent.vue'
import { Options } from './types'
import { getOptionFromOptionsAndGroupsByValue } from './utilities'
import Input from '@/components/Input/Input.vue'
import { toPixels } from '@/utilities/units'

class Props {
  modelValue = prop<string | null>({ default: null })
  placeholder = prop<string>({ default: 'Choose an Option' })
  options = prop<Options>({ default: () => ([]) })
  disabled = prop<boolean | string>({ default: false })
  required = prop<boolean | string>({ default: false })
  search = prop<boolean | string>({ default: false })
  searchPlaceholder = prop<string>({ default: 'Search by name' })
}

@Component({
  emits: ['update:modelValue'],
  name: 'Select',
  components: {
    NativeSelect,
    OptionLabel,
    SelectContent,
    Input
  }
})
export default class Select extends Vue.with(Props) {

  $refs!: {
    trigger: HTMLDivElement
    input: NativeSelect
    content: SelectContent
  }

  private open: boolean = false
  private term: string = ''
  private placement: Placement = 'top'
  private width: number = 0
  private position: PlacementPositionStyles = defaultPositionStyles

  get selected() {
    return this.modelValue
  }

  set selected(value: string | null) {
    this.$emit('update:modelValue', value)
  }

  get selectedOption() {
    return getOptionFromOptionsAndGroupsByValue(this.options, this.selected)
  }

  get isSelected() {
    return this.selected !== null
  }

  get showSearch() {
    return this.search || this.search === ''
  }

  get isDisabled() {
    return this.disabled || this.disabled === ''
  }

  get isRequired() {
    return this.required || this.required === ''
  }

  get classes() {
    return {
      select: {
        'select--open': this.open,
        'select--disabled': this.isDisabled,
        'select--invalid': this.isRequired && this.modelValue === null
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
        left: this.position.left,
        width: toPixels(this.width)
      }
    }
  }

  public mounted() {
    document.addEventListener('click', this.documentClick)
    window.addEventListener('resize', this.windowResize)
  }

  public unmounted() {
    document.removeEventListener('click', this.documentClick)
    window.removeEventListener('resize', this.windowResize)
  }

  public async openSelect() {
    if(this.open) {
      return
    }

    this.open = true

    await nextTick()
    this.updateContentWidth()
    
    await nextTick()
    this.calculatePlacementAndPosition()
  }

  public closeSelect() {
    if(!this.open) {
      return
    }

    this.open = false

    this.focus()
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

  private calculatePlacementAndPosition() {
    const { placement } = calculateMostVisiblePlacement(this.$refs.trigger, this.$refs.content.$el, document.body, ['bottom', 'top'])

    this.placement = placement
    this.position = calculatePlacementPositionStyles(placement, this.$refs.trigger, this.$refs.content.$el, document.body)
  }

  private updateContentWidth() {
    const { width } = this.$refs.trigger.getBoundingClientRect()

    this.width = width
  }

  private click(event: MouseEvent) {
    if(this.isDisabled) {
      return
    }

    this.open ? this.closeSelect() : this.openSelect()
  }

  private documentClick(event: MouseEvent) {
    if(!this.open) {
      return
    }

    const target = event.target as HTMLElement
    const inContent = this.$refs.content?.$el?.contains(target)
    const inTrigger = this.$refs.trigger.contains(target)

    if(!inContent && !inTrigger) {
      this.closeSelect()
    }
  }

  private windowResize() {
    this.closeSelect()
  }

}
</script>

<style lang="scss" scoped>
@use '../../styles/abstracts/variables';
@use '../../styles/abstracts/mixins';

.select {
  --select-background-color: #fff;
  --select-cursor: pointer;
  --select-max-width: 350px;
  --select-height: 58px;
  --miter-width: 16px;

  width: 100%;
  max-width: var(--select-max-width);
  height: var(--select-height);
  -webkit-appearance: none;
  appearance: none;
  border: 0;
  padding: 0;
  background-color: transparent;
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  color: #{variables.$black};
}

.select--open,
.select:active,
.select:hover,
.select:focus-within {
  &:not(.select--disabled) {
    --miter-border-color: #{variables.$primary};
  }
}

.select--open {
  @include mixins.drop-shadow;
}

.select--disabled {
  --select-background-color: #{variables.$disabled};
  --select-cursor: not-allowed;
}

.select--invalid {
  --miter-border-color: #{variables.$error};
}

.select__input {
  background-color: var(--select-background-color);
  cursor: var(--select-cursor);
  height: inherit;
  align-items: center;
  padding: 0 20px;
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;

  @include mixins.miter-bordered-rounded;

  @media (hover: hover) {
    display: flex;
  }
}

.select__placeholder {
  text-align: left;
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
  box-shadow: #{variables.$box-shadow-md};
}

.select__content--top {
  transform: translateY(-2px);
}

.select__content--bottom {
  transform: translateY(2px);
}
</style>