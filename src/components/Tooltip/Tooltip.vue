<template>
  <div class="tooltip-box">
    <slot />
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
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

<style scoped>
.tooltip-box {
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip {
  opacity: 1;
}

.tooltip {
  color: #ffffff;
  text-align: center;
  padding: 5px 0;
  border-radius: 2px;

  /* width: 120px; */
  width: 83px;
  bottom: 100%;
  left: 50%;
  margin-left: -40px;
  margin-bottom: 7px;

  opacity: 0;
  transition: opacity 0.7s;

  position: absolute;
  z-index: 1;

  background: #090422;
}

.text::after {
  content: ' ';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #090422 transparent transparent transparent;
}
</style>
