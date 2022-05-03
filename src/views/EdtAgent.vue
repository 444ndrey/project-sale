<template>
  <div>
    <Dialog
      :isActive="dialog.isDialogShown"
      :type="dialog.type"
      :handler="dialog.dialogFunc"
      :message="dialog.message"
      @update="$router.go(-1)"
    ></Dialog>
    <div class="control-win container">
      <h2 class="title1">
        {{ agent.name.length > 0 ? agent.name : "Контрагент" }}
      </h2>
      <div class="message-error" v-if="error.isActive">
        <ul>
          <li v-for="item in error.messages" :key="item.value">
            {{ item.value }}
          </li>
        </ul>
      </div>
      <div class="field__items">
        <div class="field__item">
          <p class="field__item-label field__item-necessary">Название:</p>
          <input
            type="text"
            v-model="agent.name"
            class="control-input"
            maxlength="25"
            placeholder="Название"
          />
        </div>
        <div class="field__item">
          <p class="field__item-label field__item-necessary">ИНН:</p>
          <input
            type="text"
            v-model="agent.inn"
            class="control-input"
            maxlength="12"
            placeholder="ИНН"
          />
        </div>
        <div class="field__item">
          <p class="field__item-label field__item-necessary">КПП:</p>
          <input
            type="text"
            v-model="agent.kpp"
            class="control-input"
            maxlength="9"
            placeholder="КПП"
          />
        </div>
        <div class="field__item">
          <p class="field__item-label field__item-necessary">Адрес:</p>
          <input
            type="text"
            v-model="agent.address"
            class="control-input"
            maxlength="50"
            placeholder="Адрес"
          />
        </div>
        <div class="field__item">
          <p class="field__item-label">Телефон:</p>
          <input
            type="text"
            v-model="agent.phone"
            class="control-input"
            maxlength="11"
            placeholder="Телефон"
          />
        </div>
        <div class="field__item">
          <p class="field__item-label">Email:</p>
          <input
            type="text"
            v-model="agent.email"
            class="control-input"
            maxlength="25"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="buttons">
        <button class="btn1" @click="saveAgent">Сохранить</button>
        <button class="btn2" @click="delAgent">Удалить</button>
        <button class="btn2" @click="$router.go(-1)">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ipcRenderer } from "electron";
import Dialog from "../components/uiControls/Dialog.vue";
export default {
  setup() {
    let dialog = ref({
      dialogFunc: () => {},
      isDialogShown: false,
      type: undefined,
      message: undefined,
    });
    const route = useRoute();
    const router = useRouter();
    const agent = ref({
      id: 0,
      name: "",
      inn: "",
      kpp: "",
      address: "",
      phone: "",
      email: "",
    });
    onMounted(() => {
      ipcRenderer.send("get-agent-info", route.query.id);
      ipcRenderer.on("send-agent-info", (e, data) => {
        agent.value = {
          id: data.id,
          name: data.name,
          kpp: data.kpp,
          inn: data.inn,
          address: data.address,
          phone: data.phone,
          email: data.email,
        };
      });
    });
    let error = ref({
      messages: [],
      isActive: false,
    });
    function saveAgent() {
      error.value.messages = [];
      error.value.isActive = false;
      let requiers = ["name", "inn", "kpp", "address"];
      let count = 0;
      for (let i = 0; i < requiers.length; i++) {
        if (agent.value[`${requiers[i]}`].length <= 0) {
          count++;
        }
      }
      if (count != 0) {
        error.value.messages.push({
          value: "Не все обязательные поля были заполнены",
        });
      }
      if (agent.value.inn.length < 10 && agent.value.inn.length != 0) {
        error.value.messages.push({ value: "ИНН указан некорректно" });
      }
      if (agent.value.kpp.length < 9 && agent.value.kpp.length != 0) {
        error.value.messages.push({ value: "КПП указан некорректно" });
      }
      if (!validInnKppNumber(agent.value.kpp, agent.value.inn)) {
        error.value.messages.push({ value: "Может содержать только цифры" });
      }
      if (error.value.messages.length != 0) {
        error.value.isActive = true;
      } else {
        let message = {
          id: agent.value.id,
          name: agent.value.name,
          kpp: agent.value.kpp,
          inn: agent.value.inn,
          address: agent.value.address,
          phone: agent.value.phone,
          email: agent.value.email,
        };
        ipcRenderer.send("edit-agent", message);
        router.go(-1);
      }
    }
    function validInnKppNumber(...args) {
      for (let item of args) {
        for (let i of [...item]) {
          if (parseInt(i).toString() != i.toString()) {
            return false;
          }
        }
      }
      return true;
    }
    function delAgent() {
      dialog.value.type = "warning";
      dialog.value.message = "Вы действительно хотите удалить этого агента ?";
      dialog.value.isDialogShown = true;
      dialog.value.dialogFunc = () => {
        let agentId = agent.value.id;
        return ipcRenderer.invoke("remove-agent", agentId);
      };
    }
    return { agent, saveAgent, error, dialog, delAgent };
  },
  components: { Dialog },
};
</script>

<style scoped>
.control-win {
  max-width: 700px;
  padding: 30px;
  height: max-content;
}
.field__items {
  margin: 0 20px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: flex-end;
}
.field__item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
}
.field__item-necessary::after {
  content: "*";
  color: #f79114;
  display: inline;
}
.field__item-label {
  margin: 5px;
  color: var(--gray-main);
}
.buttons {
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 15px;
  margin-top: 30px;
}
</style>