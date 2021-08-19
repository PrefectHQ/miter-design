<template>
  <div class="d-flex">
    <div v-if="$slots.activate">
      <slot name="activate" />
    </div>
    <teleport to="#app" :disabled="!popupOpen" v-if="popupOpen">
      <Popcontent @close="closePopUp" :placement="position"
        ><template v-slot:content
          ><div v-if="$slots.content" class="modal">
            <slot name="content" /> </div></template
      ></Popcontent>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Popcontent from './Popcontent.vue'

interface event {
  target: {
    value: string
  }
}

export default defineComponent({
  name: 'Popup',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
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
    }
  },
  emits: ['update:modelValue'],
  components: {
    Popcontent
  },
  data() {
    return {
      active: false as boolean
    }
  },
  computed: {
    popupOpen(): boolean {
      return typeof this.modelValue === 'boolean' ? this.modelValue : this.value
    },
    classList(): any {
      return this.disabled ? ['disabled'] : this.active ? ['active'] : []
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
@use '../../styles/components/card';
</style>
