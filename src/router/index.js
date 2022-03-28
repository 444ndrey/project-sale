import { createRouter, createWebHashHistory } from 'vue-router'
import Sale from '../views/Sale.vue';
import Store from '../views/Store.vue';
import Balance from '../views/Balance.vue';
import Agents from '../views/Agents.vue';
import Stat from '../views/Stat.vue';
const routes = [
  {
    path: '/sale',
    name: 'Sale',
    component: Sale
  },
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
