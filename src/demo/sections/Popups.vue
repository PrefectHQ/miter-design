<template>
  <div>
    <h3 class="mb-2">Popup</h3>
    <div class="d-flex">
      <Popup v-model="value" position="center" title="Pop Up">
        <template v-slot:activate>
          <Button color="primary" @click="openPopup"> Open Popup </Button>
        </template>
        <template v-slot:content>
          <component :is="card.contentTag || 'div'">
            {{ card.content }}
          </component>
        </template>
        <template v-slot:action>
          <component :is="'CardActions'">
            <div :class="['text-center']" class="mt-4">
              <Button color="primary">Action</Button>
            </div>
          </component>
        </template>
      </Popup>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Popup extends Vue {
  card: {} = {
    title: 'Pop Up',
    titleTag: 'h6',
    cardClass: ['text-center'],
    content: 'This is a pop up'
  }
  value = true

  mounted(): void {
    return
  }
  openPopup(): void {
    this.value = true
  }
  closePopup(): void {
    this.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
