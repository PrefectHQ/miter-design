import Card from './Card.vue'
import { withDesign } from 'storybook-addon-designs'

export default {
  title: 'Miter Design/Card',
  component: Card,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/HJgj2eHBaqt1SAYruZNjQQ/Prefect?node-id=488%3A2086'
    }
  }
}

const Template = (args) => ({
  components: { Card },
  setup() {
    return { args }
  },
  template: `<Card v-bind="args">${
    args.template || '<div class="pa-2"><h2>Title</h2> <div>Content</div></div>'
  } </Card>`
})

export const Blank = Template.bind({})
Blank.args = {
  backgroundColor: 'var(--white)',
  shadow: null,
  style: {
    width: '400px'
  }
}

export const Mitered = Template.bind({})
Mitered.args = {
  backgroundColor: 'var(--white)',
  shadow: null,
  miter: true,
  width: '400px',
  height: '800px'
}

export const Shadowed = Template.bind({})
Shadowed.args = {
  backgroundColor: 'var(--white)',
  shadow: null,
  shadow: 'lg',
  style: {
    width: '400px',
    height: '600px'
  }
}

export const Colored = Template.bind({})
Colored.args = {
  backgroundColor: 'var(--background)',
  shadow: null,
  width: '500px',
  height: '500px'
}

export const Overflow = Template.bind({})
Overflow.args = {
  backgroundColor: '#fff',
  width: '500px',
  height: '500px',
  template: `<div class="pa-2">
          <h2>Overflow content</h2>

          <div
            
            style="min-height: 24px"
            class="mt-2"
          >
            <div>
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
            style="min-height: 24px"
            class="mt-2"
          >
            <div>
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
        </div>`
}
