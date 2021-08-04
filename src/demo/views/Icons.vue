<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Icons</h1>

    <div class="icon-search-container">
      <i class="pi pi-Search pi-2x" />
      <input v-model="search" class="icon-search ml-1" placeholder="Search" />
    </div>

    <div class="mt-5 icon-grid" :class="{ overlay: selected }">
      <div v-if="selected" class="overlay" @click="selected = null" />

      <div
        v-for="[key, glyph] in filteredGlyphs"
        :key="key"
        class="mr-4 icon-container"
        @click.stop="selected = { key: key, glyph: glyph }"
      >
        <i class="pi pi-3x" :class="'pi-' + glyph.glyph" />
        <h6 class="font-weight-light text-truncate mt-2">{{ key }}</h6>
      </div>

      <h3
        v-if="filteredGlyphs.size === 0"
        class="font-weight-light text-center"
      >
        <h1>(⋟﹏⋞)</h1>
        No icons found for '{{ search }}'
      </h3>
    </div>

    <div v-if="selected" tabindex="0" class="icon-overlay pa-4 text-center">
      <h2 class="font-weight-light text-truncate">{{ selected.key }}</h2>

      <div
        class="pa-4 d-flex align-center justify-space-around text-center"
        style="min-height: 204px"
      >
        <i class="pi" :class="iconClass" :style="iconStyle" />
      </div>

      <div class="mt-2">
        Size:
        <select v-model="selectedSize">
          <option v-for="[key] in sizeOptions" :value="key" :key="key">
            {{ key }}
          </option>
        </select>
      </div>
      <div class="mt-2">
        Color:
        <select v-model="selectedColor">
          <option v-for="[key] in colorOptions" :value="key" :key="key">
            {{ key }}
          </option>
        </select>
      </div>

      <div class="mt-2">
        <div class="mt-2 text-left">Icon:</div>
        <code style="display: block">
          {{ selected.glyph.glyph }}
        </code>

        <div class="mt-2 text-left">Inline:</div>
        <!-- Ignoring this so we get correct formatting in the output without using a <pre> tag -->
        <!-- prettier-ignore -->
        <code style="display: block">
          {{`<i
            class="pi pi-${selected.glyph.glyph}
              ${sizeOptions.get(selectedSize)}"
          />`}}
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  watch: {
    search() {
      this.selected = null
    }
  }
})
export default class App extends Vue {
  glyphs: Map<string, any> = new Map()
  search: string = ''
  selected: any = null

  selectedSize: string = '6x'
  sizeOptions: Map<string, string> = new Map([
    ['xs', 'pi-xs'],
    ['sm', 'pi-sm'],
    ['lg', 'pi-lg'],
    ['2x', 'pi-2x'],
    ['3x', 'pi-3x'],
    ['4x', 'pi-4x'],
    ['5x', 'pi-5x'],
    ['6x', 'pi-6x'],
    ['7x', 'pi-7x'],
    ['8x', 'pi-8x'],
    ['9x', 'pi-9x'],
    ['10x', 'pi-10x']
  ])

  selectedColor: string = 'Grey 2'
  colorOptions: Map<string, string> = new Map([
    ['Error', '#fb4e4e'],
    ['Warning', '#f6a609'],
    ['Success', '#2ac769'],
    ['Primary 5', '#ebeef7'],
    ['Primary 10', '#e3e7f7'],
    ['Primary 20', '#d0d8f5'],
    ['Primary 40', '#acbbf3'],
    ['Primary 60', '#8a9df0'],
    ['Primary 80', '#6680ee'],
    ['Primary 100', '#024dfd'],
    ['Primary 101', '#0035b0'],
    ['Grey 1', '#090422'],
    ['Grey 2', '#465968'],
    ['Grey 3', '#f7f7f8'],
    ['Grey 4', '#cecdd3'],
    ['Grey 5', '#f7f8fa'],
    ['Grey 6', '#ebeef7']
  ])

  get filteredGlyphs(): Map<string, any> {
    return new Map(
      [...this.glyphs.entries()].filter(
        ([key, glyph]) =>
          key.toLowerCase().includes(this.search.toLowerCase()) ||
          glyph.glyph.toLowerCase().includes(this.search.toLowerCase()) ||
          glyph.unicode.toLowerCase().includes(this.search.toLowerCase())
      )
    )
  }

  get iconClass(): string[] {
    return [
      'pi-' + this.selected?.glyph.glyph,
      this.sizeOptions.get(this.selectedSize)!
    ]
  }

  get iconStyle(): { [key: string]: string } {
    return {
      color: this.colorOptions.get(this.selectedColor)!
    }
  }

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
  column-gap: 32px;
  row-gap: 64px;
  justify-content: center;
  padding: initial;
  position: relative;

  &.overlay {
    filter: blur(4px);
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

.icon-container {
  border-radius: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding-bottom: 16px;
  padding-top: 16px;

  &:hover {
    background-color: variables.$grey-5;
  }
}

.icon-search-container {
  display: flex;
  align-items: center;
}

.icon-search {
  border: none;
  border-bottom: 2px solid variables.$grey-5;
  font-size: 24px;
  font: 'prefect-icons' 'Barlow';
  letter-spacing: 0.24px;
  line-height: 34px;
  outline: none;
  position: relative;
  transition: border-bottom 150ms;
  width: 100%;

  ::placeholder {
    color: blue;
    font-family: 'prefect-icons' !important;
  }

  &:focus {
    border-bottom: 2px solid variables.$primary-100;
  }
}

hr {
  border: none;
  border-top: 1px solid variables.$grey-4;
  border-radius: 5px;
}

.icon-overlay {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
}

code {
  background-color: variables.$grey-2;
  border-radius: 4px;
  color: white;
  padding: 4px 12px;
}
</style>
