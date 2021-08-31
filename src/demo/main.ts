import { createApp } from 'vue'

// Global and functional styles
import '@/styles/main.scss'

import App from './App.vue'
import MiterDesign from '@/entry.esm'
import router from './plugins/router'

const app = createApp(App)
app.use(MiterDesign)
app.use(router)

app.config.performance = true

app.config.errorHandler = (err, vm, info) => {
  // err: error trace
  // vm: component in which error occured
  // info: Vue specific error information such as lifecycle hooks, events etc.
  // TODO: Perform any custom logic or log to server
  console.log(err, vm, info)
}

app.directive('tooltip', {
  mounted(el, binding) {
    const template = `
      <div class="tooltip">
        <div class="tooltip-inner">
        </div>
      </div>
      `
    let parent = el.parentNode
    let wrapper = document.createElement('div')

    parent.replaceChild(wrapper, el)
    wrapper.appendChild(el)
    el.parentNode.classList.add('tooltip-box')
    // el.classList.add('tooltip-box')

    const tooltipGenerator = window.document.createElement('div')
    tooltipGenerator.innerHTML = template.trim()
    const tooltipNode = tooltipGenerator.childNodes[0]
    el.appendChild(tooltipNode)

    const content = tooltipNode.querySelector('.tooltip-inner')
    content.innerHTML = binding.value
  }
})

// app.directive('tooltip', {
//   mounted(el, binding) {
// // `element` is the element you want to wrap
// var parent = el.parentNode
// var wrapper = document.createElement('div')

// // set the wrapper as child (instead of the element)
// parent.replaceChild(wrapper, el)
// // set element as child of wrapper
// wrapper.appendChild(el)

// el.parentNode.classList.add('tooltip-box')

//     el.parentNode.parentNode.childNodes[0].appendChild(
//       document.createElement('div')
//     )

//     el.parentNode.parentNode.childNodes[0].childNodes[1].appendChild(
//       document.createElement('div')
//     )

//     el.parentNode.parentNode.childNodes[0].childNodes[1].classList.add(
//       'tooltip'
//     )

//     el.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[0].classList.add(
//       'text'
//     )
//     el.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[0].innerHTML =
//       binding.value
//   }
// })
app.mount('#app')
