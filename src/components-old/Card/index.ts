import Card from './Card.vue'
import Header from './Header/Header.vue'
import Actions from './Actions/Actions.vue'
import Aside from './Aside/Aside.vue'

import { App } from 'vue'

Card.install = (app: App) => {
  app.component('CardActions', Actions)
  app.component('MCardActions', Actions)
  app.component('CardAside', Aside)
  app.component('MCardAside', Aside)
  app.component('Card', Card)
  app.component('MCard', Card)
  app.component('CardHeader', Header)
  app.component('MCardHeader', Header)
}

export default Card
