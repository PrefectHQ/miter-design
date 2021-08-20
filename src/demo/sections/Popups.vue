<template>
  <div>
    <h3 class="mb-2">Popup</h3>
    <div class="d-flex">
      <Popup v-model="value" position="flex-end">
        <template v-slot:activate>
          <Button color="primary" @click="openPopup"
            >Open Popup</Button
          ></template
        >
        <template v-slot:content>
          <Card
            :class="card.cardClass"
            :height="card.height"
            :width="card.width"
          >
            <template v-if="card.titleTag" v-slot:header>
              <component class="mt-3" :is="card.titleTag">
                {{ card.title }}
              </component>
            </template>
            <template>
              <component :is="card.contentTag || 'div'">
                {{ card.content }}
              </component>
            </template>
            <template v-slot:actions>
              <component :is="'CardActions'" class="flex-column">
                <Button @click="closePopup" color="primary">Close</Button>
              </component>
            </template>
          </Card>
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
    content: 'centered',
    height: '150px',
    width: '150px'
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
