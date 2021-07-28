<template>
  <div>
    <h3>Avatar</h3>
    <div style="display: flex">
      <div
        v-for="style in backgroundColors"
        :key="style"
        class="my-1 ml-1"
        style="inline-flex"
      >
        <Avatar :color="style">
          <img
            src="https://images.ctfassets.net/gm98wzqotmnx/ZXkXAGWyYCBGhH4B1p123/6284ca02f0acee1644a3ed64d84432a7/marvin.png"
            alt="John"
          />
        </Avatar>
      </div>
    </div>

    <div style="display: flex">
      <div
        v-for="style in backgroundColors"
        :key="style"
        style="display: flex"
        class="my-1 ml-1"
      >
        <Avatar :color="style"> TS </Avatar>
      </div>
    </div>
    <div style="display: flex">
      <div
        v-for="style in backgroundColors"
        :key="style"
        style="display: flex"
        class="my-1 ml-1"
      >
        <Avatar :color="style">
          <i class="pi pi-menu pi-2x"></i>
        </Avatar>
      </div>
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

.avatars {
  display: inline-flex;
  flex-direction: row-reverse;
}

.avatar {
  position: relative;
}

.avatar:not(:last-child) {
  margin-left: -15px;
}
</style>
