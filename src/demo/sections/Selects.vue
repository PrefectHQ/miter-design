<template>
  <div>
    <h3>Selects</h3>
    <div class="d-flex">
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
        icon="Face-ID"
        placeholder="This one has icons!"
        search
        openUp
        :options="options"
        v-model="selected2"
      >
        <Title title="Available Options" />

        <Option
          v-for="(option, i) in options"
          :key="i"
          :value="option"
          icon="Fire"
        />
        <Title title="More Options" />
        <Option value="Another" />
      </Select>
      <Select
        class="my-2"
        name="disabled"
        placeholder="You cannot choose here"
        disabled
      >
      </Select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Select from '@/components/Select/Select.vue'
import Title from '@/components/Select/Title.vue'
import Option from '@/components/Select/Option.vue'

export default defineComponent({
  name: 'Selects',
  components: { Select, Title, Option },
  data() {
    return {
      selected1: '',
      selected2: '',
      options: ['First', 'Second', 'Third']
    }
  }
})
</script>
