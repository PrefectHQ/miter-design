<template>
  <div class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-6 w-6 text-green-400" aria-hidden="true" />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p class="text-sm font-medium text-gray-900">
            Successfully saved!
          </p>
          <p class="mt-1 text-sm text-gray-500">
            Anyone with a link can now view this file.
          </p>
        </div>
        <div class="ml-4 flex-shrink-0 flex">
          <button v-if="dismissable" type="button" class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="emit('close')">
            <span class="sr-only">Close</span>
            <XIcon class="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { XIcon } from '@heroicons/vue/solid'
  import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

  const iconMap: Record<string, string> = {
    success: 'pi-checkbox-circle-line',
    error: 'pi-error-warning-line',
  }

  const colorMap: Record<string, string> = {
    success: 'bg--success',
    error: 'bg--error',
  }

  const emit = defineEmits<{
    (event: 'close'): void,
  }>()

  const props = defineProps<{
    classList?: string[],
    message?: string,
    dismissable?: boolean,
    icon?: string,
    timeout?: number,
    type?: string,
  }>()

  const timeout_ = ref<number | undefined>(undefined)

  const classList_ = computed(() => props.classList)


  const remove = () => {
    emit('close')
  }

  const clearRemoveTimeout = () => {
    if (timeout_.value) {
      clearTimeout(timeout_.value)
    }
  }


  const setRemoveTimeout = () => {
    clearRemoveTimeout()
    timeout_.value = setTimeout(() => {
      remove()
    }, props.timeout)
  }


  onMounted(() => {
    if (props.timeout) {
      setRemoveTimeout()
      // this.$el.addEventListener('mouseenter', this.clearTimeout)
      // this.$el.addEventListener('mouseleave', this.setTimeout)
    }
  })


  onBeforeUnmount(() => {
    clearRemoveTimeout()
    // this.$el.removeEventListener('mouseenter', this.clearTimeout)
    // this.$el.removeEventListener('mouseleave', this.setTimeout)

  })
</script>