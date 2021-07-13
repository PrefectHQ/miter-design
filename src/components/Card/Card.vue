<template>
  <div class="card">
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
    <section>
      <aside v-if="$slots.aside" class="mr-4">
        <slot name="aside" />
      </aside>

      <section>
        <main v-if="$slots.default" :style="style">
          <slot />
        </main>

        <footer v-if="$slots.actions">
          <slot name="actions" />
        </footer>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'
import { computed } from 'vue'

class Props {
  height = prop<string>({ default: null })
  width = prop<string>({ default: null })
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
