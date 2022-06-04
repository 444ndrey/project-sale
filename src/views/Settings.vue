<template>
  <div>
    <div class="control-win container">
      <div class="message" v-show="message.isActive">
        <p>Сохранено</p>
      </div>
      <header>
        <h2 class="title1">Параметры</h2>
        <button class="btn1" @click="save">Сохранить</button>
      </header>
      <div class="items">
        <div class="item">
          <label>Пароль:</label>
          <input
            type="password"
            maxlength="12"
            placeholder="макс. 12"
            class="control-input"
            v-model="password"
            @keydown.space.prevent
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ipcRenderer } from 'electron';
export default {
  setup() {

    let password = ref('');
    onMounted(() => {
        ipcRenderer.invoke('get-password').then(res => {
            password.value = res;
        })
    });
    const message = ref({
      isActive: false,
      message: "Сохранено",
    });
    function save() {
      savePassword();
      message.value.isActive = true;
      let timer = setTimeout(() => {
        message.value.isActive = false;
      }, 3000);
    }
    function savePassword(){
        ipcRenderer.send('save-passwrod',password.value);
    }
    return {
      message,
      save,
      password,
    };
  },
};
</script>

<style scoped>
.control-win {
  max-width: 700px;
  padding: 30px;
  height: 100%;
}
.item > label {
  color: var(--gray-main);
}
.item {
  width: 145px;
}
.title1 {
  margin: 0;
}
header {
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.message {
  width: 100%;
  background-color: #49df99;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 15px 0;
  animation: disappear 4s forwards;
}
.message > p {
    color: #fff;
}
@keyframes disappear {
  0% {
    opacity: 1;
  }
  40% {
    opacity: 0.8;
  }
  60% {
    opacity: opacity 0.5;
  }
  90% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>