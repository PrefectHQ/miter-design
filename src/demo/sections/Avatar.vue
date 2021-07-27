<template>
  <div>
    <h3>Avatar</h3>

    <div class="avatars">
      <Avatar :color="'primary-101'" class="avatar">
        <div>+1</div>
      </Avatar>
      <Avatar class="avatar">
        <div> A </div>
      </Avatar>

      <Avatar :color="'error'" class="avatar">
        <div> B</div>
      </Avatar>

      <Avatar :color="'warning'" class="avatar">
        <div>C</div>
      </Avatar>
    </div>

    <div style="display: flex">
      <div
        v-for="style in backgroundColors"
        :key="style"
        class="my-1 ml-1"
        style="inline-flex"
      >
        <Avatar :color="style">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
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
        <Avatar :color="style">
          <i class="pi pi-fire pi-2x"></i>
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
