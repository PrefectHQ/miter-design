<template>
  <section class="panel">
    <div class="panel__header">
      <slot name="before-title" v-bind="scope">
        <template v-if="showBack">
          <m-icon-button
            icon="pi-lg pi-arrow-left-s-line"
            class="panel__back"
            width="32px"
            height="32px"
            flat
            @click="close"
          />
        </template>
      </slot>
      <div class="panel__title">
        <slot name="title" v-bind="scope" />
      </div>
      <slot name="after-title" v-bind="scope">
        <m-icon-button
          icon="pi-lg pi-close-line"
          class="panel__close"
          width="32px"
          height="32px"
          flat
          @click="exit"
        />
      </slot>
    </div>

    <div class="panel__content">
      <slot />
    </div>

    <template v-if="slots.footer">
      <div class="panel__footer">
        <slot name="footer" v-bind="scope" />
      </div>
    </template>

    <template v-if="slots.actions">
      <div class="panel__actions">
        <slot name="actions" v-bind="scope" />
      </div>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { computed, useSlots } from 'vue'
  import { queue } from '@/plugins/Panel'

  const emit = defineEmits<{
    (event: 'close' | 'exit'): void,
  }>()

  const slots = useSlots()

  const showBack = computed(() => queue.length > 1)

  const close = (): void => emit('close')
  const exit = (): void => emit('exit')
  const scope = { close, exit, showBack }
</script>

<style lang="scss" scoped>
.panel {
  --padding: var(--p-2);

  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;

  height: 100vh;
  width: 500px;
  max-width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0px 10px 15px rgba(0, 0, 0, 0.1))
          drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.05));
}

.panel__header {
  display: flex;
  align-items: center;
  font-size: 20px;
  color:  var(--grey-80);
  padding: var(--padding);
}

.panel__title {
  margin-left: auto;
}

.panel__close {
  margin-left: auto;
}

.panel__content {
  font-size: 14px;
  color:  var(--grey-80);
  border-top: 1px solid var(--secondary-hover);
  border-bottom: 1px solid var(--secondary-hover);
  padding: var(--padding);
  flex-grow: 1;
  overflow-x: scroll;
}

.panel__footer,
.panel__actions {
  padding: var(--padding);
}

.panel__actions {
  display: flex;
  gap: var(--m-1);

  > * {
    flex-grow: 1;
  }
}

:slotted(.panel-hr) {
  border: 0;
  border-top: 1px solid var(--secondary-hover);
  margin: var(--padding) calc(var(--padding) * -1);
}
</style>