<template>
  <div>
    <h3>TagsList</h3>
    <div class="caption-small mb-2">(Renders joint string of passed tags in flat style. If no tags passed, renders "--"(2 hyphens). If joint length of passed tags is over <b>tagLengthLimit</b> renders the size number of the array and <b>show</b> tooltip to see all the tags)</div>
    <TagsList icon="pi-label" :tags="this.no_tags" flat/>
    <TagsList icon="pi-label" :tags="this.shortTags" flat/>
    <TagsList icon="pi-label" :tags="this.longTags" flat/>
    <TagsList icon="pi-label" :tags="this.tags" flat/>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class TagsList extends Vue {
  tags = ["Apollo", "Orion", "Production", "Label", "Label", "Label"]
  shortTags = ["Apollo", "Orion", "Production"]
  longTags = ["Production", "Andromeda", "Cassiopeia"]
  no_tags = []
}
</script>

<style scoped>

</style>