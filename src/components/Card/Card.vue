<template>
  <div
    class="card"
    :class="{
      ['drop-shadow-' + shadow]: shadow,
      miter: miter,
      outlined: outlined
    }"
    :style="containerStyle"
  >
    <div v-bind="$attrs" :style="style">
      <header v-if="$slots.header">
        <slot name="header" />
      </header>
      <section>
        <aside v-if="$slots.aside" class="mr-4">
          <slot name="aside" />
        </aside>

        <section>
          <article v-if="$slots.default">
            <slot />
          </article>

          <footer v-if="$slots.actions">
            <slot name="actions" />
          </footer>
        </section>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  backgroundColor = prop<string>({ default: null })
  height = prop<string>({ default: null })
  width = prop<string>({ default: null })
  outlined = prop<boolean>({ default: false, type: Boolean })
  shadow = prop<string>({ default: null })
  miter = prop<boolean>({ default: false, type: Boolean })
}

// This alias is needed because vue-class-component isn't yet compatible with storybook
// See https://github.com/storybookjs/storybook/issues/14052#issuecomment-797512590 for details
const Component = Options
@Component({
  name: 'MCard',
})
export default class MCard extends Vue.with(Props) {
  get style(): { [key: string]: any } {
    return {
      backgroundColor: this.backgroundColor,
      height: this.height,
      width: this.width
    }
  }

  get containerStyle(): { [key: string]: any } {
    return {
      height: this.height,
      width: this.width
    }
  }

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/card';
</style>
