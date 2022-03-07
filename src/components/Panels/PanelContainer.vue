<template>
  <div class="panel-container" :class="classes.root">
    <transition-group name="panel-slide-transition" appear>
      <template v-for="(panel, index) in queue" :key="index">
        <component :is="panel.component" v-bind="panel.props" :showBack="index !== 0" @close="close" @exit="exit" />
      </template>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watchEffect } from 'vue'
  import { queue, close, exit } from '@/plugins/Panel'

  const visible = computed(() => queue.length > 0)

  const classes = computed(() => ({
    root: {
      'panel-container--visible': visible.value,
    },
  }))

  watchEffect(() => {
    document.body.classList.toggle('body--panels-visible', visible.value)
  })
</script>

<style lang="scss">
  .body--panels-visible {
    overflow: hidden;
  }
</style>

<style lang="scss" scoped>
.panel-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--layer-panels, 100);
  pointer-events: none;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0,0,0,0);
    transition: background-color 0.5s ease;
  }
}

.panel-container--visible {
  pointer-events: all;

  &:before {
    background-color: rgba(0,0,0,0.1);
  }
}

.panel-slide-transition-leave-active,
.panel-slide-transition-enter-active {
  transition: transform 0.5s;
}
.panel-slide-transition-enter-from {
  transform: translate(100%, 0);
}

.panel-slide-transition-enter-to,
.panel-slide-transition-leave-from {
  transform: translate(0, 0);
}
.panel-slide-transition-leave-to {
  transform: translate(100%, 0);
}
</style>