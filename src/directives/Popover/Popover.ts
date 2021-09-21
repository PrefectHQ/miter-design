import { DirectiveBinding, ObjectDirective } from '@vue/runtime-dom'
import Popover from '../../components/Popover/Popover.vue'
import { mount } from '../mount'
import { h } from 'vue'

export const PopoverDirective: ObjectDirective = {
  mounted(el: any, binding: DirectiveBinding) {
    // props -> v-model="show" position="top" target="opener" :title="title"
    // slots -> activate and content
    // ? instead of appending to the current el, append to the body
    //   render (h) {
    // return h(MyInput, {
    //   props: { value: this.message },
    //   on: { input: (value) => { this.message = value } }
    // })

    mount(
      Popover,
      {
        props: { show: binding.arg?.show, position: 'top', title: 'title' }
      },
      el
    )
  }
}

// export const PopoverDirective: ObjectDirective = {
//   mounted(el: any, binding: DirectiveBinding) {
//     el.setAttribute('id', 'popoverTarget')
//     console.log(document.getElementById('tooltip-container'))
//     el.addEventListener('mouseenter', () => {
// mount(
//   Popover,
//   {
//     props: {
//       currentElRect: 'popoverTarget',
//       title: binding?.arg?.title,
//       content: '',
//       position: binding?.arg?.position
//     },
//     children: h(binding?.arg?.content)
//   },
//   el
// )
//     })

//     el.addEventListener('mouseleave', () => {
//       document.getElementById('tooltip-container')?.parentElement?.remove()
//     })
//   }
// }

export default PopoverDirective
