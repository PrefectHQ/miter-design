<template>
  <div>
    <h3>Avatar</h3>

    <div class="row">
      <Avatar
        v-for="style in backgroundColors"
        :key="style"
        :color="style"
        class="mr-1"
      >
        <span v-if="backgroundColors[0] == style">TS</span>
        <img
          v-else-if="backgroundColors[1] == style"
          src="https://images.ctfassets.net/gm98wzqotmnx/ZXkXAGWyYCBGhH4B1p123/6284ca02f0acee1644a3ed64d84432a7/marvin.png"
          alt="marvin"
        />
        <i v-else class="pi pi-fire pi-2x"></i>
      </Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Avatar extends Vue {
  backgroundColors = ['primary', 'error', 'primary-101']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/avatar';

.row {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
