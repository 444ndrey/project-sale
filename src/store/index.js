import { ipcRenderer } from 'electron'
import { createStore } from 'vuex'

let router = createStore({
  state: {
    auth: {
      isLock: false
    }
    
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
isPasswordExist();
export default router
function isPasswordExist(){
    ipcRenderer.invoke('get-password').then(res => {
      if(res == ''){
        router.state.auth.isLock = false;
      }
      else{
        router.state.auth.isLock = true;
      }
    }).then(res => res);
}
