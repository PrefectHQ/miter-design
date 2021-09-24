<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Components</h1>
    <Cards />
    <Popups />
    <Popover class="mt-10" />
    <Buttons class="mt-10" />
    <Toggles class="mt-10" />
    <RadioButtons class="mt-10" />
    <Checkboxes />
    <Sliders class="mt-10" />
    <Inputs class="mt-10" />
    <Links class="mt-10" />
    <TabSection class="mt-10" />
    <Tag class="mt-10" />
    <TagGroup class="mt-10" />
    <Avatar class="mt-10" />
    <Toasts class="mt-10" />
    <Tooltip class="mt-10" />
    <Selects class="mt-10" />
    <TextAreas class="mt-10" />
    <Breakpoints class="mt-10" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Buttons from '../sections/Buttons.vue'
import Breakpoints from '../sections/Breakpoints.vue'
import Toggles from '../sections/Toggles.vue'
import Cards from '../sections/Cards.vue'
import RadioButtons from '../sections/RadioButtons.vue'
import Checkboxes from '../sections/Checkboxes.vue'
import Links from '../sections/Links.vue'
import Avatar from '../sections/Avatar.vue'
import TabSection from '../sections/TabSection.vue'
import TagGroup from '../sections/TagGroup.vue'
import Tag from '../sections/Tag.vue'
import Popups from '../sections/Popups.vue'
import Sliders from '../sections/Sliders.vue'
import Toasts from '../sections/Toasts.vue'
import Inputs from '../sections/Inputs.vue'
import Tooltip from '../sections/Tooltip.vue'
import Selects from '../sections/Selects.vue'
import Popover from '../sections/Popover.vue'
import TextAreas from '../sections/TextAreas.vue'

@Options({
  components: {
    Buttons,
    Breakpoints,
    Cards,
    Inputs,
    Popups,
    RadioButtons,
    Links,
    Avatar,
    Toggles,
    Sliders,
    Checkboxes,
    Selects,
    TabSection,
    Tag,
    TagGroup,
    Toasts,
    Popover,
    TextAreas,
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
