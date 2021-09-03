import Skeleton from './Skeleton.ts'

import Button from '@/components/Button/Button.vue'
import Card from '@/components/Card/Card.vue'

export default {
  title: 'Miter Design/Skeleton Loader',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=739%3A549'
    }
  }
}

const Template = (args, { argTypes }) => ({
  components: { Button, Card },
  directives: {
    skeleton: Skeleton
  },
  setup() {
    return { args }
  },
  template: `${args.template}`
})

export const ButtonSkeleton = Template.bind({})
ButtonSkeleton.storyName = 'Button'
ButtonSkeleton.args = {
  template: '<Button v-skeleton="args.loading" color="primary">Button</Button>',
  loading: true
}

export const CardSkeleton = Template.bind({})
const cardTemplate = `<Card :width="args.width + 'px'" :height="args.height + 'px'" class="d-inline-block">
  <div>
    <h2 v-skeleton="args.loading">Title</h2>

    <div
      v-skeleton="args.loading"
      style="min-height: 24px"
      class="mt-2"
    >
      <div v-if="!args.loading">
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
  </div>
</Card>
`

CardSkeleton.storyName = 'Card'
CardSkeleton.args = {
  template: cardTemplate,
  loading: true,
  width: 400,
  height: 400
}
