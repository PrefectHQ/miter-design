<template>
  <div>
    <h3>Tags</h3>

    <div class="caption-small mb-2">(Click to toggle props)</div>
    <div>
      <Button
        :color="disabled ? 'primary' : 'secondary'"
        @click="disabled = !disabled"
      >
        Disabled
      </Button>
      <Button
        class="ml-1"
        :color="outlined ? 'primary' : 'secondary'"
        @click="outlined = !outlined"
      >
        Outlined
      </Button>
      <Button
        class="ml-1"
        :color="elevated ? 'primary' : 'secondary'"
        @click="elevated = !elevated"
      >
        Elevated
      </Button>
    </div>
    <Tag
      v-for="style in tagStyles"
      :key="style"
      class="mr-1 text-capitalize mt-2"
      :color="style"
      :disabled="disabled"
      :outlined="outlined"
      :elevated="elevated"
      icon="pi-label"
    >
      tag
    </Tag>

    <h4 class="mt-4">Flat</h4>
    <Tag
      v-for="(style, i) in flatTagStyles"
      :key="i"
      class="mr-2 mt-2"
      :color="style.color"
      :disabled="disabled"
      :outlined="outlined"
      :elevated="elevated"
      :style="style.style"
      flat
      :icon="style.icon"
    >
      {{ style.text }}
    </Tag>
    <h4 class="mt-4">Rectangle</h4>
<div class="short-">
    
    <Tag
      v-for="(style, i) in rectangleTagStyles"
      :key="i"
      class="mr-2 mt-2 short-tag"
      :color="style.color"
      :disabled="style.disabled"
      :miter="false"
    >
      {{ style.text }}
    </Tag>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tag extends Vue {
  tagStyles = ['primary', 'error']
  flatTagStyles = [
    { text: 'Tag', icon: 'pi-label', color: null },
    { text: 'ProductionDB', icon: 'pi-label', color: null },
    {
      text: 'A really really long tag with a title but text truncation',
      icon: 'pi-fire-line',
      color: 'error',
      style: {
        maxWidth: '200px'
      }
    }
  ]
  rectangleTagStyles = [{text: 'Rectangle', color: 'primary', disabled: false}, {text: 'Disabled', color: 'primary', disabled: true}, {text: 'Green', color: 'success', disabled: false}]
  disabled = false
  outlined = false
  elevated = false

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
.short-tag {
  height: 20px;
}
  </style>
