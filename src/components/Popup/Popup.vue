<template>
  <div class="d-flex">
    <button @click="popUpClosed = false">Open Popup</button>
    <teleport to="body" :disabled="popUpClosed" v-if="!popUpClosed">
      <div class="modal-backdrop" @click.self="closePopUp">
        <Card
          class="modal"
          :class="card.cardClass"
          :height="card.height"
          :width="card.width"
        >
          <template v-if="card.headerTag" v-slot:header>
            <component
              :is="card.headerTag"
              :class="card.headerClass"
              :height="card.headerHeight"
            >
              {{ card.header }}
            </component>
          </template>

          <component
            v-if="card.overline"
            :is="card.overlineTag || 'div'"
            :class="card.overlineClass"
          >
            {{ card.overline }}
          </component>
          <component
            v-if="card.title"
            :is="card.titleTag || 'div'"
            :class="card.titleClass"
          >
            {{ card.title }}
          </component>
          <component
            v-if="card.subtitle"
            :is="card.subtitleTag || 'div'"
            :class="card.subtitleClass"
          >
            {{ card.subtitle }}
          </component>

          <template v-if="card.asideTag" v-slot:aside>
            <component
              :is="card.asideTag || 'div'"
              :class="card.asideClass"
              :width="card.asideWidth"
            >
              {{ card.aside }}
            </component>
          </template>

          <component
            v-if="card.content"
            :is="card.contentTag || 'div'"
            :class="card.contentClass"
          >
            {{ card.content }}
          </component>

          <template v-slot:actions>
            <component
              v-if="card.actions"
              :class="card.actionClass"
              :is="'CardActions'"
            >
              <component
                v-for="(action, index) in card.actions"
                :key="index"
                :is="action.tag"
                :color="action.color"
                class="mt-2"
                :disabled="action.disabled"
                :class="action.class"
                @click="closePopUp"
              >
                {{ action.text }}
              </component>
            </component>
          </template>
        </Card>
      </div>
    </teleport>
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
  name: 'Popup',
  props: {
    card: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 50
    },
    step: {
      type: Number,
      default: 1
    },
    modelValue: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false
    },
    label: {
      type: String,
      default: ''
    },
    hideLabel: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      active: false as boolean,
      popUpClosed: false as boolean
    }
  },
  computed: {
    classList(): any {
      return this.disabled ? ['disabled'] : this.active ? ['active'] : []
    }
  },
  methods: {
    closePopUp() {
      this.popUpClosed = true
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/popup';
</style>
