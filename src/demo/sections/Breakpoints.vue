<template>
  <div>
    <h3>Breakpoints</h3>
    <div class="caption"
      >This section shows reactive breakpoints that can be applied with the
      breakpoint directive:
    </div>
    <pre class="bg--grey-80 text--white px-2" style="border-radius: 8px">
    <code>
{{`<div v-breakpoints="'md'">
  I'll only show up on screen sizes > 1000px
</div>`}}
    </code>
</pre>

    The following breakpoints are valid:

    <pre class="bg--grey-80 text--white px-2" style="border-radius: 8px">
    <code>
{{`xs: 450,
sm: 640,
md: 1000,
lg: 1250,
xl: 1440`
}}
    </code>
</pre>
    <hr />

    <h4>Demo:</h4>

    <div class="d-flex">
      <Card
        v-if="noBreakpoints"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          I only show up if when the screen width is smaller than all
          breakpoints!
        </div>
      </Card>

      <Card
        v-breakpoints="'xs'"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          <h1>xs</h1>
          <h2>> 450px</h2>
          <div class="text--blue-80 mt-2" v-html="content" />
        </div>
      </Card>
      <Card
        v-breakpoints="'sm'"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          <h1>sm</h1>
          <h2>> 640px</h2>
          <div class="text--blue-80 mt-2" v-html="content" />
        </div>
      </Card>
      <Card
        v-breakpoints="'md'"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          <h1>md</h1>
          <h2>> 1000px</h2>
          <div class="text--blue-80 mt-2" v-html="content" />
        </div>
      </Card>
      <Card
        v-breakpoints="'lg'"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          <h1>lg</h1>
          <h2>> 1250px</h2>
          <div class="text--blue-80 mt-2" v-html="content" />
        </div>
      </Card>

      <Card
        v-breakpoints="'xl'"
        width="200px"
        height="200px"
        class="mr-2 my-1"
        outlined
      >
        <div class="px-4 py-2">
          <h1>xl</h1>
          <h2>> 1440px</h2>
          <div class="text--blue-80 mt-2" v-html="content" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Breakpoints extends Vue {
  content: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.`

  get noBreakpoints(): boolean {
    return Object.values(this.$breakpoints).every((val) => !val)
  }

  mounted(): void {
    return
  }
}
</script>
