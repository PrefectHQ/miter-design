<template>
  <div class="tooltip-box">
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Tooltip',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    classList(): string[] {
      return []
    }
  },
  methods: {}
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>

<!-- 

<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}

.tooltip {
  width: 83px;
  height: 34px;

  color: black;
  position: absolute;
  bottom: 100%;

  padding: 5px 0;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.7s;
  background: #090422;
  color: #ffffff;

  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -15%);

  opacity: 0;
  transition: opacity 0.7s;

  display: flex;
  justify-content: center;
  align-items: center;
}

.text::after {
  content: '';
  position: absolute;

  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #090422;
  top: 100%;
  left: 50%;

  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
-->
