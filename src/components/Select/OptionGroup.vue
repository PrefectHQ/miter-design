<script lang="ts">
import { defineComponent } from 'vue'
import Option from './Option.vue'

export default defineComponent({
  name: 'OptionGroup',
  components: { Option },
  props: {
    label: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
@use '../../styles/components/select';
</style>
