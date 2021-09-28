<template>

  <svg :width="width" :height="height" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">

    <path 
      d="M5.89251 45.5578V5.81415H46.1733V39.9455L44.1677 41.9404L40.5309 45.5578H5.89251Z" 
      class="loading-logo"
      stroke-width="10.2045" 
      mask="url(#spinner-mask)"
    />
    
    <defs>
      <mask id="spinner-mask">
        <g stroke-width="52" fill="black">
          <rect height="100%" width="100%" />
          <path d="M 52 26 A 1 1 0 0 0 0 26" stroke="url(#spinner-gradient)" />
          
          <animateTransform
            from="0 26 26"
            to="360 26 26"
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1500ms"
          />
        </g>
      </mask>
      
      <linearGradient id="spinner-gradient">
        <stop offset="0%" stop-opacity="0" stop-color="white" />
        <stop offset="100%" stop-opacity="1" stop-color="white" />
      </linearGradient>
    </defs>
    
  </svg>

</template>

<script lang="ts">
import { Vue, Options, prop } from 'vue-class-component'

class Props {
  height = prop<number>({ default: 52 })
  width = prop<number>({ default: 52 })
}

const Component = Options
@Component({})
export default class Loading extends Vue.with(Props) {

}
</script>

<style lang="scss" scoped>
@use '../../styles/components/loading';
</style>

