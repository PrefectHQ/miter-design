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
    <!-- <div class="d-flex">
      <Select
        class="my-2 mr-2"
        name="without-icon"
        :options="options"
        v-model="selected1"
      >
        <Option v-for="(option, i) in options" :key="i" :value="option" />
      </Select>
      <Select
        class="my-2 mr-2"
        name="with-icon"
        placeholder="This one has props!"
        search
        :options="options"
        v-model="selected2"
      >
        <OptionGroup label="V-For Options">
          <Option
            v-for="(option, i) in options"
            :key="i"
            :value="option"
            icon="fire-line"
          />
        </OptionGroup>
        <OptionGroup label="Object Options">
          <Option
            v-for="(option, i) in items"
            :key="i"
            :data="option"
            :value="option.label"
            icon="fire-line"
          ></Option>
        </OptionGroup>
        <OptionGroup label="Single Options">
          <Option value="1" /><Option value="2" /><Option value="3" />
        </OptionGroup>
        <OptionGroup label="Disabled Group" disabled>
          <Option value="no click" />
        </OptionGroup>
        <Option value="4" /><Option value="5" disabled />
      </Select>
      <Select
        class="my-2"
        name="disabled"
        placeholder="You cannot choose here"
        disabled
      >
      </Select>
    </div>
    <div class="d-flex">
      <Select
        class="my-2 mr-2"
        name="without-icon"
        :options="options"
        open-up
        v-model="selected1"
      >
        <Option v-for="(option, i) in options" :key="i" :value="option" />
      </Select>

      <Select
        class="my-2 mr-2"
        name="with-icon"
        placeholder="This one has props!"
        search
        open-up
        :options="options"
        v-model="selected2"
      >
        <OptionGroup label="V-For Options">
          <Option
            v-for="(option, i) in options"
            :key="i"
            :value="option"
            icon="fire-line"
          />
        </OptionGroup>
        <OptionGroup label="Object Options">
          <Option
            v-for="(option, i) in items"
            :key="i"
            :data="option"
            :value="option.label"
            icon="fire-line"
          ></Option>
        </OptionGroup>
        <OptionGroup label="Single Options">
          <Option value="1" /><Option value="2" /><Option value="3" />
        </OptionGroup>
        <OptionGroup label="Disabled Group" disabled>
          <Option value="no click" />
        </OptionGroup>
        <Option value="4" /><Option value="5" disabled />
      </Select>
      <Select
        class="my-2"
        name="disabled"
        placeholder="You cannot choose here"
        open-up
        disabled
      >
      </Select>
    </div>-->
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
