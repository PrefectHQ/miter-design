<template>
  <fieldset class="m-button-group" v-bind="{ disabled }">
    <template v-for="(item, index) in items" :key="index">
      <button type="button" class="m-button-group__button" :class="getItemClass(item)" :disabled="getItemDisabled(item)" @click="toggleItem(item)">
        <slot v-bind="{ item }">
          {{ getItemLabel(item) }}
        </slot>
      </button>
    </template>
  </fieldset>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue'
  import { ButtonGroupItemsProp, ButtonGroupItemProp, ButtonGroupItemValue } from './types'

  export default defineComponent({
    name: 'MButtonGroup',
    expose: [],
    props: {
      items: {
        type: Array as PropType<ButtonGroupItemsProp>,
        required: true,
      },

      value: {
        type: Array as PropType<ButtonGroupItemValue[]>,
        required: true,
      },
      disabled: {
        type: Boolean
      }
    },

    emits: ['update:value'],
    computed: {
      internalValue: {
        get: function() {
          return this.value
        },

        set: function(value: ButtonGroupItemValue[]) {
          this.$emit('update:value', value)
        },
      },
    },

    methods: {
      toggleItem(item: ButtonGroupItemProp) {
        const value = this.getItemValue(item)
        const index = this.internalValue.indexOf(value)

        console.log(value)

        if (index >= 0) {
          this.internalValue.splice(index, 1)
        } else {
          this.internalValue.push(value)
        }
      },

      getItemClass(item: ButtonGroupItemProp) {
        const value = this.getItemValue(item)

        return {
          'm-button-group__button--selected': this.value.includes(value),
        }
      },
      getItemLabel(item: ButtonGroupItemProp): string {
        return typeof item === 'object' ? item.label ?? item.value.toString() : item.toString()
      },
      getItemValue(item: ButtonGroupItemProp): ButtonGroupItemValue {
        return typeof item === 'object' ? item.value : item
      },
      getItemDisabled(item: ButtonGroupItemProp): boolean {
        return typeof item === 'object' ? item.disabled ?? false : false
      }
    },
  })
</script>

<style lang="scss">
.m-button-group {
  border: 1px solid #CECDD3;
  display: inline-flex;
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
}

.m-button-group__button {
  appearance: none;
  cursor: pointer;
  border: 0;
  background-color: var(--grey-10);
  color: var(--grey-80);
  font-family: 'input-sans';
  font-size: 14px;
  line-height: 16px;
  padding: var(--p-1) var(--p-2);
  padding-bottom: calc(var(--p-1) - 2px);
  border-right: 1px solid #CECDD3;

  &:last-child {
    border-right: 0px
  }

  &:hover {
    background-color: var(--secondary-hover);
  }

  &:active {
    background-color: var(--secondary-pressed);
  }

  &:disabled {
    pointer-events: hover;
    cursor: not-allowed;
    background-color: var(--grey-10);
    color: var(--grey-20);
  }
}

.m-button-group__button--selected {
  background-color: var(--primary);
  color: #fff;
  border-right-color: var(--primary);

  &:hover {
    background-color: var(--primary-hover);
  }

  &:active {
    background-color: var(--primary-pressed);
  }
}
</style>