<template>
  <div>
    <h3 class="mb-2">Popup</h3>
    <div class="d-flex">
      <Popup
        v-for="popup in popups"
        :key="popup"
        teleportTo="#app"
        v-model="popup.value"
        :position="popup.position"
        :title="popup.title"
        :height="popup.height"
        :width="popup.width"
      >
        <template v-slot:activate>
          <Button color="primary" @click="openPopup(popup)" class="ml-1">
            Open {{ popup.position }} Popup
          </Button>
        </template>
        <template v-slot:content>
          <component :is="'div'">
            {{ popup.content }}
          </component>
        </template>
        <template v-slot:actions>
          <component :is="'Actions'">
            <Button @click="actionClicked" color="primary">Action</Button>
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
  popups: { [key: string]: any } = [
    {
      content: 'This is a pop up',
      height: '341px',
      width: '730px',
      position: 'center',
      title: 'Center Pop Up',
      value: false
    },
    {
      content: 'This is another pop up',
      height: '269px',
      width: '350px',
      position: 'flex-end',
      title: 'Flex End Pop Up',
      value: false
    }
  ]

  value = true

  mounted(): void {
    return
  }
  openPopup(popup: { value: Boolean }): void {
    popup.value = true
  }
  actionClicked(): void {
    console.log('pop up action button clicked')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
