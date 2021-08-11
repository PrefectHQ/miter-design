<template>
  <span :class="shadow && 'shadowWrapper'">
    <div class="card">
      <header v-if="$slots.header">
        <slot name="header" />
      </header>
      <section>
        <aside v-if="$slots.aside" class="mr-4">
          <slot name="aside" />
        </aside>

        <section>
          <article v-if="$slots.default" :style="style">
            <slot />
          </article>

          <footer v-if="$slots.actions">
            <slot name="actions" />
          </footer>
        </section>
      </section>
    </div>
  </span>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  height = prop<string>({ default: null })
  width = prop<string>({ default: null })
  shadow = prop<boolean>({ default: false })
}

@Options({})
export default class Card extends Vue.with(Props) {
  style = computed(() => {
    return {
      height: this.height,
      width: this.width
    }
  })

  mounted(): void {
    return
  }
}
</script>

<style lang="scss" scoped>
@use '../../styles/components/card';
</style>
