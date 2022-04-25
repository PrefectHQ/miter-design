<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Components</h1>
    <Buttons class="mt-10" />
  </div>
</template>

<script lang="ts" setup>
import Buttons from '../sections/Buttons.vue'
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
