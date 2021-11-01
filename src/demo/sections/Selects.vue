<template>
  <div>
    <h3 class="mb-2">Selects</h3>
    <Select v-model="value" :options="options" search />
    <p>Native Select</p>
    <NativeSelect v-model="value" :options="options" />
    <p>Simple Select</p>
    <SimpleSelect v-model="value" :options="simpleOptions" />
    <p>Disabled Select</p>
    <Select v-model="value" :options="options" disabled />
    <p>Required Select</p>
    <Select v-model="value" :options="options" required />
  </div> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Select from '@/components/Select/Select.vue'
import NativeSelect from '@/components/Select/NativeSelect.vue'
import SimpleSelect from '@/components/Select/SimpleSelect.vue'
import { Options } from '@/components/Select/types'

const options: Options<string> = [
  { label: 'First', value: 'first', icon: 'time-line' },
  { label: 'Second', value: 'second', disabled: true },
  { label: 'Third', value: 'third' },
  { label: 'Group', options: [
    { label: 'Another', value: 'another' },
    { label: 'And Another', value: 'and another' },
  ]},
]

export default defineComponent({
  name: 'Selects',
  components: { 
    Select,
    NativeSelect,
    SimpleSelect
  },
  data() {
    return {
      value: null,
      options,
      simpleOptions: ['first', 'second', 'third', 'another', 'and another']
    }
  }
})
</script>
