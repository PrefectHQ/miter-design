<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Components</h1>
    <Avatar class="mt-10" />
    <Breakpoints class="mt-10" />
    <Buttons class="mt-10" />
    <Cards class="mt-10" />
    <Checkboxes class="mt-10" />
    <Inputs class="mt-10" />
    <Links class="mt-10" />
    <Popover class="mt-10" />
    <Popups class="mt-10" />
    <Radios class="mt-10" />
    <Toggles class="mt-10" />
    <Selects class="mt-10" />
    <Sliders class="mt-10" />
    <TabSection class="mt-10" />
    <Tag class="mt-10" />
    <TagGroup class="mt-10" />
    <TextAreas class="mt-10" />
    <Toasts class="mt-10" />
    <Tooltip class="mt-10" />

    <!-- 
  
    
    
    
     -->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Avatar from '../sections/Avatar.vue'
import Breakpoints from '../sections/Breakpoints.vue'
import Buttons from '../sections/Buttons.vue'
import Cards from '../sections/Cards.vue'
import Checkboxes from '../sections/Checkboxes.vue'
import Inputs from '../sections/Inputs.vue'
import Links from '../sections/Links.vue'
import Popover from '../sections/Popover.vue'
import Popups from '../sections/Popups.vue'
import Radios from '../sections/Radios.vue'
import Toggles from '../sections/Toggles.vue'
import Selects from '../sections/Selects.vue'
import Sliders from '../sections/Sliders.vue'
import Tag from '../sections/Tag.vue'
import TabSection from '../sections/TabSection.vue'
import TagGroup from '../sections/TagGroup.vue'
import TextAreas from '../sections/TextAreas.vue'
import Toasts from '../sections/Toasts.vue'
import Tooltip from '../sections/Tooltip.vue'

@Options({
  components: {
    Avatar,
    Buttons,
    Breakpoints,
    Cards,
    Checkboxes,
    Inputs,
    Links,
    Popover,
    Popups,
    Radios,
    Toggles,
    Selects,
    Sliders,
    TabSection,
    Tag,
    TagGroup,
    TextAreas,
    Toasts,
    Tooltip
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
[v-cloak] {
  display: none;
}
</style>
