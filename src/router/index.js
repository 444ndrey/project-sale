import { createRouter, createWebHashHistory } from 'vue-router'
import Store from '../views/Store.vue';
import Balance from '../views/Balance.vue';
import Agents from '../views/Agents.vue';
import Stat from '../views/Stat.vue';
import NewAgent from '../views/NewAgent.vue';
const routes = [
  {
    path: '/store',
    name: 'Store',
    component: Store
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance
  },
  {
    path: '/agents',
    name: 'Agents',
    component: Agents
  },
  {
    path: '/stat',
    name: 'Stat',
    component: Stat
  },
  {
    path: '/newagent',
    name: 'NewAgent',
    component: NewAgent
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
