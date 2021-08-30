<template>
  <div class="toast" :class="classList">
    <div>
      <slot>{{ text }}</slot>
      <Button class="ml-2" @click="remove">Close</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import Button from '@/components/Button/Button.vue'

class Props {
  color = prop<string>({})
  text = prop<string>({})
}

@Options({
  components: {
    Button
  }
})
export default class Toast extends Vue.with(Props) {
  get classList() {
    return [this.color]
  }

  remove() {
    this.$root?.$el.remove(this.$root?.$el)
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/toast';
</style>
