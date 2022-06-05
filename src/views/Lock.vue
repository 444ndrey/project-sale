<template>
  <div>
    <div class="control-win container">
      <div class="title1">Введите пароль</div>
      <input
        type="password"
        placeholder="Пароль"
        maxlength="12"
        class="control-input"
        v-model="value"
      />
      <footer>
        <button class="btn1" @click="unlock">Разблокировать</button>
        <p class="error" v-if="isError">Неверный пароль</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ipcRenderer } from "electron";
import store from "../store/index.js";
import router from '../router/index.js';
export default {
  setup() {
    let value = ref("");
    let password = null;
    let isError = ref(false);
    onMounted(() => {
      ipcRenderer.invoke("get-password").then((res) => {
        password = res;
      });
    });
    function unlock() {
      isError.value = false;
      if (password != value.value) {
        isError.value = true;
      } else {
        store.state.auth.isLock = false;
        router.push('/');
      }
    }
    return {
      isError,
      value,
      unlock,
    };
  },
};
</script>

<style scoped>
.control-win {
  max-width: 700px;
  max-height: 300px;
  margin-top: 100px;
}
.title1 {
  text-align: center;
}
.control-input {
  text-align: center;
  font-size: 25px;
}
footer {
  margin-top: 40px;
  width: 100%;
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
}
.error {
  color: var(--red);
  font-weight: bold;
  user-select: none;
}
</style>