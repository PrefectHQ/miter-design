<template>
  <div class="mt-5 pb-10" v-cloak>
    <h1>Views</h1>
    <hr />

    <main>
      <form>
        <div class="input-half">
          <Input v-model="firstName" label="First Name" />
        </div>
        <div class="input-half">
          <Input v-model="lastName" label="Last Name" />
        </div>

        <div class="input-full">
          <Input v-model="emailAddress" label="Email" />
        </div>
        <div class="input-full">
          <TextArea
            v-model="userDescription"
            label="Description"
            placeholder="Describe yourself..."
          />
        </div>
      </form>
    </main>
  </div>
</template>

<script lang="ts" setup>
import Input from '@/components/Input/Input.vue';
import TextArea from '@/components/TextArea/TextArea.vue';
import { ref } from 'vue';

const firstName = ref('')
const lastName = ref('')
const emailAddress = ref('')
const userDescription = ref('')

</script>

<style lang="scss">
.input-half {
  grid-column: span 1;
}

.input-full {
  grid-column: span 2;
}

form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(1fr);
  row-gap: 16px;
  column-gap: 16px;
}
</style>