<template>
    <div ref="tooltip" class="tooltip">
      <div class="tooltip__content">
        <slot>
          {{ content }}
        </slot>
      </div>
    </div>
</template>

<script lang="ts">
import { Placement } from '../../utilities/position'
import { Vue, prop } from 'vue-class-component'

class Props {
  placement = prop<Placement>({ default: 'top' })
  content = prop<string>({ required: false, default: '' })
}

export default class TooltipContent extends Vue.with(Props) {

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/tooltip';
</style>