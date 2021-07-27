<template>
  <div>
    <h3>Avatar</h3>
    <div
      v-for="style in backgroundColors"
      :key="style"
      style="display: inline-flex"
      class="my-2 ml-1"
    >
      <Avatar :color="style">
        <span v-if="backgroundColors[3] !== style"> NS</span>
        <span v-else>+1</span>
      </Avatar>
    </div>
    <br />
    <div
      v-for="style in backgroundColors"
      :key="style"
      style="display: inline-flex"
      class="my-2 ml-1"
    >
      <Avatar :color="style">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="John" />
      </Avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Avatar extends Vue {
  backgroundColors = ['primary', 'warning', 'success', 'error']

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/avatar';
</style>
