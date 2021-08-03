<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Icons</h1>

    <div class="mt-5 icon-grid">
      <div
        v-for="[key, glyph] in glyphs"
        :key="key"
        class="mr-4 icon-container"
      >
        <h6 class="font-weight-light text-truncate mb-2">{{ key }}</h6>
        <i class="pi pi-3x" :class="'pi-' + glyph.glyph" />
        <!-- <hr class="text--grey-5" />
        <div class="text-left">
          <code>{{ glyph.glyph }}</code>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class App extends Vue {
  glyphs: Map<string, any> = new Map()

  async mounted() {
    const path = '../../assets/fonts/fonts/prefect-icons.svg?raw'
    const svg = await import(path)

    const parser = new DOMParser()
    const vDOM = parser.parseFromString(svg.default, 'image/svg+xml')

    vDOM.querySelectorAll('glyph').forEach((glyph: Element) => {
      const title = glyph.getAttribute('data-tags') as string
      const name = glyph.getAttribute('glyph-name')
      const unicode = glyph.getAttribute('unicode')
      if (!name) return

      this.glyphs.set(title, {
        glyph: name,
        unicode: unicode
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/abstracts/variables';

[v-cloak] {
  display: none;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, max-content));
  grid-gap: 16px;
  justify-content: center;
  padding: initial;
}

.icon-container {
  display: flex;
  flex-direction: column;
  height: 150px;
  text-align: center;
  justify-content: center;

  width: 200px;

  code {
    background-color: variables.$grey-2;
    border-radius: 4px;
    color: white;
    padding: 4px 12px;
  }
}

hr {
  border: none;
  border-top: 1px solid variables.$grey-4;
  border-radius: 5px;
}
</style>
