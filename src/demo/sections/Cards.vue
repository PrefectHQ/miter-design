<template>
  <div>
    <h3>Cards</h3>
    <Button class="my-4" @click="skeletonLoader = !skeletonLoader">
      Toggle loader
    </Button>

    <div class="card-section pa-4">
      <Card
        width="400px"
        height="500px"
        class="mr-4 mt-4 d-inline-block"
        shadow="sm"
      >
        <template v-slot:header>
          <component :is="'CardActions'" class="pa-2">
            <Button color="primary">Primary</Button>
            <a class="ml-2">Skip for now</a>
          </component>
        </template>

        <div class="pa-2">
          <h2 v-skeleton="skeletonLoader">Overflow content</h2>

          <div
            v-skeleton="skeletonLoader"
            style="min-height: 24px"
            class="mt-2"
          >
            <div v-if="!skeletonLoader">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              <br />
              Suspendisse sit amet sagittis erat, vel lacinia felis. Curabitur
              blandit accumsan scelerisque. In id facilisis sapien. Proin
              malesuada eros nec tempor faucibus. Suspendisse vel vestibulum
              tortor, vitae convallis elit. Nam non dolor gravida, tempor nunc
              vitae, maximus velit. Maecenas consequat ante nunc, posuere cursus
              est congue quis. Morbi at convallis nunc. Maecenas tempus ex at
              hendrerit commodo. Duis urna elit, auctor vitae purus in,
              hendrerit volutpat justo. Mauris ac leo placerat, fermentum justo
              a, cursus nibh. Phasellus in elementum quam. Ut non facilisis
              augue, nec suscipit quam. Integer dignissim lobortis ligula, in
              pellentesque leo euismod eget. Aenean sodales sodales sem non
              fermentum. Duis posuere pretium ante, vel faucibus odio eleifend
              sit amet.
            </div>
          </div>

          <div
            v-skeleton="skeletonLoader"
            style="min-height: 24px"
            class="mt-2"
          >
            <div v-if="!skeletonLoader">
              Aliquam nec convallis nunc. Sed efficitur consequat dolor,
              condimentum hendrerit ante dignissim nec. Aliquam erat volutpat.
              Aenean blandit lectus a dolor gravida condimentum. Aenean ac
              lacinia libero, quis iaculis urna. Duis interdum dolor ligula, et
              semper eros maximus nec. Maecenas maximus, ante sit amet
              sollicitudin posuere, metus purus tristique ante, ac sollicitudin
              ex magna ullamcorper sem. Quisque et dapibus nisi, ac iaculis ex.
              Etiam eu nulla nec felis vulputate finibus sit amet eget mauris.
              Nulla ornare ultrices ex sit amet lobortis. Morbi et varius nisi,
              vel porttitor sapien. Integer quis diam neque. Nunc porttitor
              auctor suscipit. Nullam ullamcorper lobortis massa. Etiam maximus,
              lacus eget volutpat pharetra, risus neque rutrum erat, dapibus
              varius sem quam vitae lorem. Pellentesque habitant morbi tristique
              senectus et netus et malesuada fames ac turpis egestas. Nulla sem
              ex, fermentum non elit et, pellentesque aliquet felis. Nunc vitae
              eros id ipsum laoreet pulvinar ac nec ex. Vestibulum tincidunt
              nunc sapien. Proin laoreet tempus ex sit amet convallis. Nullam
              pellentesque nisl sit amet magna rhoncus lobortis. Donec ex orci,
              porta ut magna ullamcorper, suscipit mollis magna. Etiam at dolor
              orci. Duis iaculis varius velit. Donec tempor leo eget aliquam
              laoreet. Morbi ut fermentum nulla, vel tristique nisi. Phasellus
              eget sapien nec elit dictum scelerisque.
              <br />
              Proin tempus nisl nec diam dapibus, sit amet facilisis risus
              mattis. Aliquam erat volutpat. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Interdum et malesuada fames ac ante
              ipsum primis in faucibus. Nullam vehicula tortor diam, nec porta
              lacus dictum vitae. Nulla vel tellus magna. Nunc nisi lacus,
              molestie eget sapien ac, ornare iaculis elit. Nulla volutpat
              egestas felis vel hendrerit.
            </div>
          </div>
        </div>

        <template v-slot:actions>
          <component :is="'CardActions'" class="pa-2">
            <Button color="primary">Primary</Button>
            <a class="ml-2">Skip for now</a>
          </component>
        </template>
      </Card>

      <Card
        v-for="(card, index) in cards"
        :key="index"
        class="mr-4 mt-4 d-inline-block"
        :class="card.cardClass"
        :height="card.height"
        :width="card.width"
        :shadow="card.shadow"
        :miter="card.miter"
        :background-color="card.backgroundColor"
        :outlined="card.outlined"
      >
        <template v-if="card.headerTag" v-slot:header>
          <component
            :is="card.headerTag"
            :class="card.headerClass"
            :height="card.headerHeight"
            v-skeleton="skeletonLoader"
          >
            {{ card.header }}
          </component>
        </template>

        <component
          v-if="card.overline"
          :is="card.overlineTag || 'div'"
          :class="card.overlineClass"
          v-skeleton="skeletonLoader"
        >
          {{ card.overline }}
        </component>
        <component
          v-if="card.title"
          :is="card.titleTag || 'div'"
          :class="card.titleClass"
          v-skeleton="skeletonLoader"
        >
          {{ card.title }}
        </component>
        <component
          v-if="card.subtitle"
          :is="card.subtitleTag || 'div'"
          :class="card.subtitleClass"
          v-skeleton="skeletonLoader"
        >
          {{ card.subtitle }}
        </component>

        <template v-if="card.asideTag" v-slot:aside>
          <component
            :is="card.asideTag || 'div'"
            :class="card.asideClass"
            :width="card.asideWidth"
            v-skeleton="skeletonLoader"
          >
            {{ card.aside }}
          </component>
        </template>

        <component
          v-if="card.content"
          :is="card.contentTag || 'div'"
          :class="card.contentClass"
          v-skeleton="skeletonLoader"
        >
          {{ card.content }}
        </component>

        <template v-slot:actions>
          <component
            v-if="card.actions"
            :class="card.actionClass"
            :is="'CardActions'"
          >
            <component
              v-for="(action, index) in card.actions"
              :key="index"
              :is="action.tag"
              class="mr-2"
              :color="action.color"
              :disabled="action.disabled"
              :class="action.class"
              v-skeleton="skeletonLoader"
            >
              {{ action.text }}
            </component>
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
  cards: { [key: string]: any } = [
    {
      title: 'Welcome to PREFECT',
      titleTag: 'h2',
      cardClass: ['text-center'],
      backgroundColor: 'var(--background)',
      height: '385px',
      width: '350px',
      shadow: 'md',
      miter: true,
      contentClass: ['my-auto', 'pa-2'],
      content: "See all the new features we've added in the tutorial.",
      actionClass: ['flex-column', 'pa-2'],
      actions: [
        { tag: 'Button', color: 'primary', text: 'Primary' },
        { tag: 'a', text: 'Skip for now', class: ['my-2'] }
      ]
    },
    {
      title: 'Welcome to PREFECT',
      titleTag: 'h2',
      titleClass: ['py-2'],
      height: '300px',
      width: '730px',
      shadow: 'lg',
      miter: true,
      contentClass: ['my-auto', 'py-2'],
      content: "See all the new features we've added in the tutorial.",
      asideTag: 'CardAside',
      asideClass: ['bg--black'],
      asideWidth: '175px',
      actionClass: ['py-2'],
      actions: [
        { tag: 'Button', color: 'primary', text: 'Primary' },
        { tag: 'a', text: 'Skip for now' }
      ]
    },
    {
      title: '85,103',
      titleTag: 'h3',
      titleClass: ['mt-auto', 'px-2'],
      height: '250px',
      width: '300px',
      outlined: true,
      contentClass: ['pa-2'],
      overline: 'Hello world',
      overlineClass: ['caption', 'pa-2'],
      subtitle: 'Tasks Pending',
      subtitleClass: ['mb-auto', 'text--prefect', 'px-2'],
      actionClass: ['pa-2'],
      actions: [
        {
          tag: 'div',
          class: ['font-weight-medium'],
          text: 'Monday, June 21'
        }
      ]
    },
    {
      headerTag: 'CardHeader',
      headerClass: ['bg--black'],
      headerHeight: '300px',
      title: 'Welcome to PREFECT',
      titleTag: 'h5',
      titleClass: ['pa-2'],
      outlined: true,
      width: '500px',
      subtitle: 'Secondary text',
      subtitleClass: ['text--primary', 'mt-1', 'pa-2'],
      contentClass: ['my-auto', 'pa-2'],
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      actionClass: ['pa-2'],
      actions: [
        { tag: 'Button', color: 'primary', text: 'Action 1' },
        { tag: 'Button', disabled: true, text: 'Action 2' }
      ]
    }
  ]

  skeletonLoader = false

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

.card-section {
  max-width: 100%;
  overflow: auto;
  display: flex;
}
</style>
