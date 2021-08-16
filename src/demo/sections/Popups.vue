<template>
  <div>
    <h3>Popup</h3>
    <div class="d-flex">
      <Popup
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        class="mr-4 mt-4 d-inline-block"
      >
      </Popup>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Cards extends Vue {
  cards: {} = [
    {
      title: 'Pop Up',
      titleTag: 'h6',
      cardClass: ['text-center'],
      height: '150px',
      width: '150px',
      actionClass: ['flex-column'],
      actions: [{ tag: 'Button', color: 'primary', text: 'Close' }]
    }
  ]

  mounted(): void {
    return
  }

  handleClick(): void {
    // eslint-disable-next-line no-console
    console.log('clicked!')
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/button';
</style>
