<template>
  <div>
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
        <button class="btn2" @click="$router.go(-1)">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const route = useRoute();
    const agents = [
      {
        id: 0,
        name: 'ооо"Магазин"',
        inn: "141131510365",
        kpp: "000000000",
        address: "г.Москва ул.Улчиная д.17",
        phone: "8 123 4567089",
        email: "some@gmail.com",
      },
      {
        id: 1,
        name: "ИП Иванов",
        inn: "757040423077",
        kpp: "000000000",
        address: "г.Москва ул.Другая 18",
        phone: "8 123 4567089",
        email: "some@gmail.com",
      },
      {
        id: 2,
        name: 'оао "ИДЕЯ"',
        inn: "621883385834",
        kpp: "000000000",
        address: "г.Ярославль ул.Ярославская д.9",
        phone: "8 123 4567089",
        email: "some@gmail.com",
      },
    ];
    const agent = ref(agents.find((item) => item.id == route.query.id));
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
      if(!validInnKppNumber(agent.value.kpp,agent.value.inn)){
          error.value.messages.push({ value: "Может содержать только цифры" });
      }
      if (error.value.messages.length != 0) {
        error.value.isActive = true;
      }
    }
    function validInnKppNumber(...args) {
      for(let item of args){
        for(let i of [...item]){

          if(parseInt(i).toString() != i.toString()) {
            return false
        }
      }
      }
      return true;
    }

    return { agent, saveAgent, error };
  },
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