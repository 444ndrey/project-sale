<template>
  <div>
    <div class="control-win container">
      <h2 class="title1">Новый контрагент</h2>
      <div class="message-error" v-if="error.isActive">
        <ul>
          <li v-for="item in error.messages" :key="item.value">
            {{ item.value }}
          </li>
        </ul>
      </div>
      <div class="field__items">
        <div class="field__item field__item-necessary">
          <input
            type="text"
            class="control-input"
            v-model="agent.name"
            maxlength="25"
            placeholder="Название"
          />
        </div>
        <div class="field__item field__item-necessary">
          <input
            type="text"
            class="control-input"
            v-model="agent.inn"
            maxlength="12"
            placeholder="ИНН"
            @keypress="validNumber"
          />
        </div>
        <div class="field__item field__item-necessary">
          <input
            type="text"
            class="control-input"
            maxlength="9"
            v-model="agent.kpp"
            placeholder="КПП"
            @keypress="validNumber"
          />
        </div>
        <div class="field__item field__item-necessary">
          <input
            type="text"
            class="control-input"
            maxlength="50"
            v-model="agent.address"
            placeholder="Адрес"
          />
        </div>
        <div class="field__item">
          <input
            type="text"
            class="control-input"
            maxlength="11"
            v-model="agent.phone"
            placeholder="Телефон"
            @keypress="validNumber"
          />
        </div>
        <div class="field__item">
          <input
            type="text"
            class="control-input"
            maxlength="25"
            v-model="agent.email"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="buttons">
        <button class="btn1" @click="addAgent">Добавить</button>
        <button class="btn2" @click="$router.go(-1)">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { ipcRenderer } from "electron";
export default {
  setup() {
    let router = useRouter();
    const agent = ref({
      id: 0,
      name: "",
      inn: "",
      kpp: "",
      address: "",
      phone: "",
      email: '',
      params: [{ id: 0, name: "vk", value: "vk.com/tnv44" }],
    });
    let error = ref({
      messages: [],
      isActive: false,
    });
    function addAgent() {
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
      if (agent.value.inn.length == 10 || agent.value.inn.length == 12){}
      else{
        error.value.messages.push({ value: "ИНН указан некорректно" });
      }
      if (agent.value.kpp.length != 9) {
        error.value.messages.push({ value: "КПП указан некорректно" });
      }
      if (error.value.messages.length != 0) {
        error.value.isActive = true;
      } else {
        let message = {
          id: agent.value.id,
          inn: agent.value.inn,
          kpp: agent.value.kpp,
          name: agent.value.name,
          address: agent.value.address,
          phone: agent.value.phone,
          email: agent.value.email,
        };
        ipcRenderer.send("add-agent", message);
        router.push({name: 'Agents'})
      }
    }
     function validNumber(e) {
        if((e.keyCode < 48 || e.keyCode > 57)){
          e.preventDefault();
          return;
        }
    }
    return { agent, addAgent, error, validNumber };
  },
};
</script>

<style scoped>
.control-win {
  max-width: 1000px;
  padding: 30px;
  color: var(--gray-secound);
  height: max-content;
}
.field__items {
  margin: 0 20px;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;
  justify-content: flex-start;
}
.field__item {
  width: 340px;
  display: flex;
}
.buttons {
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  gap: 15px;
  margin-top: 30px;
}
.field__item-necessary::after {
  content: "*";
  color: #f79114;
  display: inline;
}
</style>