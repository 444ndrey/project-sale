import { createRouter, createWebHashHistory } from 'vue-router'
//#region Imports Components
import Store from '../views/Store.vue';
import Balance from '../views/Balance.vue';
import Agents from '../views/Agents.vue';
import Stat from '../views/Stat.vue';
import NewAgent from '../views/NewAgent.vue';
import EdtAgent from '../views/EdtAgent.vue';
import NewProduct from '../views/NewProduct.vue';
import ProdctInfo from '../views/ProductInfo.vue';
import Welcome  from '../views/Welcome.vue';
import NewPurchase from '../views/NewPurchase.vue';
import NewSale from '../views/NewSale.vue';
import Settings  from '../views/Settings.vue';

//#endregion
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
  },
  {
    path: '/edtagent',
    name: 'EdtAgent',
    component: EdtAgent
  },
  {
    path: '/newproduct',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/productinfo',
    name: 'ProdctInfo',
    component: ProdctInfo
  },
  {
    path: '',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/newpurchase',
    name: 'NewPurchase',
    component: NewPurchase
  },
  {
    path: '/newsale',
    name: 'NewSale',
    component: NewSale
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
