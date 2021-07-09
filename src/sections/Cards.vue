<template>
  <div>
    <h3>Cards</h3>
    <div class="d-flex">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="mr-4 mt-4 d-inline-block"
        :class="card.cardClass"
        :height="card.height"
        :width="card.width"
      >
        <div>
          <component :is="card.titleTag || 'div'" :class="card.titleClass">
            {{ card.title }}
          </component>
          <component
            :is="card.subtitleTag || 'div'"
            :class="card.subtitleClass"
          >
            {{ card.subtitle }}
          </component>
          <component :is="card.contentTag || 'div'" :class="card.contentClass">
            {{ card.content }}
          </component>
        </div>

        <template v-if="card.actions" v-slot:actions>
          <component
            v-for="(action, index) in card.actions"
            :key="index"
            :is="action.tag"
            class="mr-2"
            :color="action.color"
            :disabled="action.disabled"
            :class="action.class"
          >
            {{ action.text }}
          </component>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Cards extends Vue {
  cards = [
    {
      title: 'Welcome to PREFECT',
      titleTag: 'h2',
      cardClass: ['text-center'],
      height: '385px',
      width: '350px',
      contentClass: ['my-auto'],
      content: "See all the new features we've added in the tutorial.",
      actions: [
        { tag: 'Button', color: 'primary', text: 'Primary' },
        { tag: 'a', text: 'Skip for now' }
      ]
    },
    {
      title: 'Welcome to PREFECT',
      titleTag: 'h2',
      width: '730px',
      content: "See all the new features we've added in the tutorial.",
      actions: [
        { tag: 'Button', color: 'primary', text: 'Primary' },
        { tag: 'a', text: 'Skip for now' }
      ]
    },
    {
      title: '85,103',
      titleTag: 'h5',
      height: '250px',
      width: '300px',
      overline: 'Hello world',
      subtitle: 'Tasks Pending',
      subtitleClass: ['text--primary'],
      actions: [
        {
          tag: 'div',
          class: ['font-weight-medium'],
          text: 'Monday, June 21'
        }
      ]
    },
    {
      title: 'Welcome to PREFECT',
      titleTag: 'h5',
      width: '300px',
      overline: 'Hello world',
      subtitle: 'Secondary text',
      subtitleClass: ['text--primary'],
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      actions: [
        { tag: 'Button', color: 'primary', text: 'Action 1' },
        { tag: 'Button', disabled: true, text: 'Action 2' }
      ]
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
