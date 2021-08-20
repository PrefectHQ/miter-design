<template>
  <div>
    <div
      id="backdrop"
      class="modal-backdrop"
      @click.self="closePopUp"
      :style="position"
      ><Card :class="positionClass" :height="height" :width="width">
        <h4 class="h4-bottom">
          {{ title }}
          <span class="close-icon" @click="closePopUp">
            <i class="pi pi-X mr-1"></i>
          </span>
        </h4>

        <div v-if="$slots.content">
          <slot name="content" />
        </div>
        <template v-slot:actions>
          <div v-if="$slots.actions">
            <slot name="actions" />
          </div>
        </template>
      </Card>
    </div>
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
  name: 'Popcontent',
  props: {
    modelValue: {
      type: Boolean,
      required: false
    },
    value: {
      type: Boolean,
      required: false
    },
    height: {
      type: String,
      default: '269px'
    },
    width: {
      type: String,
      default: '350px'
    },
    placement: {
      type: String,
      required: false,
      default: 'center'
    },
    title: {
      type: String,
      required: false
    }
  },
  emits: ['close'],
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    position(): any {
      return {
        '--position-place': `${this.placement}`
      }
    },
    positionClass(): string {
      const pos =
        this.placement == 'flex-start'
          ? 'mt-2 ml-2'
          : this.placement == 'flex-end'
          ? 'mb-2 mr-2'
          : ''
      return pos
    },
    popupOpen(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  methods: {
    closePopUp() {
      this.$emit('close', false)
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
@use '../../styles/components/card';
</style>
