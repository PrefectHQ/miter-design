<template>
  <div v-if="logVal">
    <h3>Input</h3>
    <div v-for="state in states" :key="state" class="my-2 setWidth">
      <Input
        v-model="state.val"
        id="123"
        type="state.type"
        name="input"
        autocomplete="on"
        :placeholder="state.placeholder"
        required
        :disabled="state.state == 'disabled'"
        :label="state.label"
        @invalid="handleInvalid"
        :subtitle="state.subtitle"
        :validityIcon="true"
      >
        <template v-slot:prepend>
          <i class="pi-Search pi-2x"></i>
        </template>
        <template v-slot:append>
          <Toggle :disabled="state.state == 'disabled'" />
        </template>
      </Input>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import { computed } from 'vue'

@Options({})
export default class Inputs extends Vue {
  stepVal = 1 as number
  minVal = 0 as number
  maxVal = 10 as number
  states = [
    { state: 'default', val: 'hello', subtitle: 'Default subtitle', label: "test label" },
    { state: 'placeholder', val: '', subtitle: 'placeholder subtitle', placeholder: "Placeholder" },
    { state: 'disabled', val: 'Hello again', label: 'Disabled', }
  ]

  mounted(): void {
    return
  }
  logVal = computed(() => {
    console.log(
      'val',
      this.states.map((state) => state.val)
    )
    return true
  })

  handleInvalid(validityState: ValidityState) {
    console.log('validity', validityState)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/components/input';
.setWidth {
  width: 375px;
}
</style>
