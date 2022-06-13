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
            class="control-input control-input-short"
            v-model="password"
            @keydown.space.prevent
          />
        </div>

        <div class="item item-line"></div>
        <div class="item">
          <h3 class="title2">Счет:</h3>
          <label>БИК:</label>
          <input
            @keypress="validNumber"
            type="text"
            class="control-input control-input-short"
            maxlength="9"
            placeholder="БИК"
            v-model="org.bik"
          />
        </div>
        <div class="item">
          <label>Названние организации:</label>
          <input
            type="text"
            placeholder="Названние организации"
            class="control-input"
            maxlength="25"
            v-model="org.name"
          />
        </div>
        <!-- <div class="item">
          <label>Название БАНКА:</label>
          <input
            type="text"
            placeholder="Банк"
            class="control-input"
            maxlength="50"
            v-model="org.bankName"
          />
        </div> -->
        <div class="item">
          <label>Номер счета:</label>
          <input
            type="text"
            placeholder="Сч.№"
            @keypress="validNumber"
            class="control-input"
            maxlength="20"
            v-model="org.account"
          />
        </div>
        <div class="item">
          <label>ИНН:</label>
          <input
            type="text"
            placeholder="ИНН"
            @keypress="validNumber"
            class="control-input"
            maxlength="12"
            v-model="org.inn"
          />
        </div>
        <div class="item">
          <label>КПП:</label>
          <input
            type="text"
            placeholder="КПП"
            @keypress="validNumber"
            class="control-input control-input-short"
            maxlength="9"
            v-model="org.kpp"
          />
        </div>
        <div class="item">
          <label>Адрес:</label>
          <input
            type="text"
            placeholder="Адрес"
            class="control-input"
            maxlength="50"
            v-model="org.address"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { ipcRenderer } from "electron";
export default {
  setup() {
    let password = ref("");
    onMounted(() => {
      ipcRenderer.invoke("get-password").then((res) => {
        password.value = res;
      });
      ipcRenderer.invoke("get-org-data").then(res => {
        if (res != null) {
          console.log(res);
          org.value = res;
        }
      });
    });
    const message = ref({
      isActive: false,
      message: "Сохранено",
    });
    const org = ref({
      bik: "",
      bankName: "",
      account: "",
      inn: "",
      kpp: "",
      address: "",
      name: "",
    });
    function save() {
      savePassword();
      saveOrgInfo();
      message.value.isActive = true;

      setTimeout(() => {
        message.value.isActive = false;
      }, 3000);
    }
    function saveOrgInfo() {
      let message = {};
      Object.assign(message,org.value);
      ipcRenderer.send("set-org-data", message);
    }

    function savePassword() {
      ipcRenderer.send("save-passwrod", password.value);
    }
    function validNumber(e) {
      if (e.keyCode < 48 || e.keyCode > 57) {
        e.preventDefault();
        return;
      }
    }
    return {
      message,
      save,
      password,
      validNumber,
      org,
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
  cursor: default;
}
.items {
  gap: 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.item {
  width: 100%;
  display: flex;
  flex-direction: column;
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
.control-input {
  width: 100%;
}
.control-input-short {
  max-width: 150px;
}
.item-line {
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
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