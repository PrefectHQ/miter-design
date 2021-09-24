<template>
  <Card miter class="toast" :class="classList">
    <div class="toast--content">
      <slot>{{ content }}</slot>
      <Button v-if="dismissable" class="text--white ml-2" flat @click="remove">
        Close
      </Button>
    </div>
  </Card>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import Card from '@/components/Card/Card.vue'
import Button from '@/components/Button/Button.vue'

class Props {
  color = prop<string>({ default: 'primary' })
  content = prop<string>({ required: false, default: '' })
  dismissable = prop<boolean>({ default: true, type: Boolean })
}

@Options({
  components: {
    Button,
    Card
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
