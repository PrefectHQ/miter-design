<template>
<div>
  <h3>Tags component with options</h3>
  <div class="caption-small mb-2">(Renders optional <b>v-for</b> of <b>Tag</b>-s components, or returns "--" (2 hyphens) if a passed tags prop is an empty array. To style <b>Tags</b>, pass same props (disabled, outlined, elevated etc.) as you would for <b>Tag</b>)</div>
  <Tags :tags="this.tags" elevated disabled hovered class="my-1"/>
  <Tags icon="pi-label" :tags="this.tags" flat/>
  <Tags icon="pi-fire-line" :tags="this.no_tags" elevated hovered class="my-1"/>
  <Tags icon="pi-label" :tags="this.no_tags" flat />
</div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tags extends Vue {
  tags = ["one", "two", "three"];
  no_tags = []
}
</script>

<style scoped>

</style>