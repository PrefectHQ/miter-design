<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport to="#app" :disabled="!popupOpen" v-if="popupOpen">
      <PopupContent @close="closePopUp" :placement="position" :title="title">
        <template v-slot:content>
          <div v-if="$slots.content">
            <slot name="content" />
          </div>
          <div v-if="$slots.actions">
            <slot name="actions" />
          </div>
        </template>
      </PopupContent>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PopupContent from './PopupContent.vue'

export default defineComponent({
  name: 'Popup',
  props: {
    modelValue: {
      type: Boolean,
      required: false
    },
    value: {
      type: Boolean,
      required: false
    },
    position: {
      type: String,
      required: false,
      default: 'center'
    },
    title: {
      type: String,
      required: false
    }
  },
  emits: ['update:modelValue'],
  //Using Popcontent compoenent to facilitate testing
  components: {
    PopupContent
  },
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    popupOpen(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    }
  },
  methods: {
    closePopUp() {
      this.$emit('update:modelValue', false)
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
</style>
