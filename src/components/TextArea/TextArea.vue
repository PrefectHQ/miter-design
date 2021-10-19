<template>
  <fieldset class="textarea" v-bind="{ disabled }">
    <template v-if="label.length || subtitle.length || $slots.label || $slots.subtitle">
      <div class="textarea__header">
        <template v-if="label.length || $slots.label">
          <label :for="id" class="textarea__label">
            <slot name="label">
              {{ label }}
            </slot>
          </label>
        </template>
        <template v-if="subtitle.length || $slots.subtitle">
          <label :for="id" class="textarea__subtitle">
            <slot name="subtitle">
            {{ subtitle }}
            </slot>
          </label>
        </template>
      </div>
    </template>
    <div class="textarea__miter">
      <textarea 
        v-model="value" 
        ref="input" 
        class="textarea__input" 
        :class="classes.input" 
        :style="styles.input" 
        v-bind="{ id, disabled, placeholder, required, minLength, maxLength }"
        @input="validate"
      />
      <div class="textarea__handle" :class="classes.handle" @mousedown.left="mousedown"></div>
    </div>
    <template v-if="!valid">
      <div class="textarea__error">
        <slot name="error" />
      </div>
    </template>
  </fieldset>
</template>

<script lang="ts">
import { Component } from '../../utilities/vue-class-component'
import { Vue, prop } from 'vue-class-component'

let counter = 0

function generateId() {
  return `textarea-${counter++}`
}

class props {
  modelValue = prop<string>({ required: true })
  id = prop<string>({ default: generateId })
  label = prop<string>({ default: '' })
  subtitle = prop<string>({ default: '' })
  placeholder = prop<string>({ default: 'Write here...' })
  required = prop<boolean>({ default: false })
  disabled = prop<boolean>({ default: false })
  minLength = prop<number>({ default: null })
  maxLength = prop<number>({ default: null })
}

@Component({
  name: 'TextArea',
  emits: ['update:modelValue', 'invalid'],
  watch: {
    value: {
      immediate: true,
      handler() {
        this.checkForOverflow()
        this.validate()
      }
    }
  }
})
export default class TextArea extends Vue.with(props) {

  public $refs!: {
    input: HTMLTextAreaElement
  } 

  private width: number | null = null
  private height: number | null = null
  private widthDragOffset: number = 0
  private heightDragOffset: number = 0
  private overflowX: boolean = false
  private overflowY: boolean = false
  private valid: boolean = true;

  get value() {
    return this.modelValue
  }

  set value(value: string) {
    this.$emit('update:modelValue', value)
  }

  get classes() {
    return {
      input: {
        'textarea__input--overflow-x': this.overflowX,
        'textarea__input--overflow-y': this.overflowY
      },
      handle: {
        'textarea__handle--overflow-x': this.overflowX,
        'textarea__handle--overflow-y': this.overflowY
      }
    }
  }

  get styles() {
    return {
      input: {
        width: `${this.width}px`,
        height: `${this.height}px`
      }
    }
  }

  private mousedown(event: MouseEvent) {
    const rect = this.$refs.input.getBoundingClientRect()

    this.widthDragOffset = event.clientX - (rect.x + rect.width)
    this.heightDragOffset = event.clientY - (rect.y + rect.height)

    document.body.classList.add('textarea-dragging')
    document.addEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseup', this.mouseup)

  }

  private mouseup() {
    document.body.classList.remove('textarea-dragging')
    document.removeEventListener('mousemove', this.mousemove)
    document.addEventListener('mouseup', this.mouseup)
  }

  private mousemove(event: MouseEvent) {
    const rect = this.$refs.input.getBoundingClientRect()
    const width = event.clientX - rect.x
    const height = event.clientY - rect.y

    this.width = width - this.widthDragOffset
    this.height = height - this.heightDragOffset

    this.checkForOverflow()
  }

  private validate() {
    return this.$nextTick(() => {
      this.valid = this.$refs.input.checkValidity()

      this.$emit('invalid', this.valid)
    })
  }

  private checkForOverflow() {
    return this.$nextTick(() => {
      this.overflowX = this.$refs.input.scrollHeight > this.$refs.input.clientHeight
      this.overflowY = this.$refs.input.scrollWidth > this.$refs.input.clientWidth
    })
  }

}
</script>
<style lang="scss">
@use '../../styles/components/textarea';
</style>
