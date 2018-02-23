import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import CharacterSelect from './views/CharacterSelect.vue'

import BattleRoom from './components/BattleRoom.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/character',
      name: 'character',
      component: CharacterSelect
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleRoom
    },
    {
      path: '/character',
      name: 'character',
      component: CharacterSelect
    }
  ]
})
