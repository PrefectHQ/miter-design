<template>
  <div>
    <h3>TagList</h3>
    <div class="caption-small mb-2">(Renders joint string of passed tags in flat style. If no tags passed, renders "--"(2 hyphens). If joint length of passed tags is over <b>tagLengthLimit</b> (can be passed as a prop, default 30) renders the size number of the array and <b>show</b> tooltip to see all the tags)</div>
    <TagList icon="pi-prefect" :tags="this.no_tags" />
    <TagList icon="pi-label" :tags="this.shortTags" />
    <TagList icon="pi-earth-line" :tags="this.shortTags" :limit="20"/>
    <TagList icon="pi-label" :tags="this.tags" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class TagList extends Vue {
  tags = ["Apollo", "Orion", "Production", "Label", "Label", "Label"]
  shortTags = ["Apollo", "Orion", "Production"]
  no_tags = []
}
</script>

<style scoped>

</style>