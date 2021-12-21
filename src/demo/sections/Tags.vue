<template>
  <div>
    <h3>Tags</h3>
    <div class="caption-small mb-2">(Renders joint string of passed tags in flat style. If no tags passed, renders "--"(2 hyphens). If joint length of passed tags is over <b>tagLengthLimit</b> (can be passed as a prop, default 30) renders the size number of the array and <b>show</b> tooltip to see all the tags)</div>
    <Tags icon="pi-prefect" :tags="[]" />
    <Tags :tags="this.shortTags" />
    <Tags icon="pi-earth-line" :tags="this.shortTags" :limit="2"/>
    <Tags :tags="this.tags" />
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Tags extends Vue {
  tags = ["Apollo", "Orion", "Production", "Label", "Label2", "Label3"]
  shortTags = ["Apollo", "Orion", "Production"]
}
</script>

<style scoped>

</style>