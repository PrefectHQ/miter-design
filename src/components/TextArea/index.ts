import TextArea from './TextArea.vue'

import { App } from 'vue'

TextArea.install = (app: App) => {
  app.component('MTextArea', TextArea)
  app.component('TextArea', TextArea)
}

export default TextArea
