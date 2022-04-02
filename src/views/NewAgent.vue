<template>
  <div>
    <div class="control-win container">
      <h2 class="title1">Новый контрагент</h2>
      <ErrorMessage></ErrorMessage>
      <div class="field__items">
        <div class="field__item field__item-necessary">
          <input type="text" class="control-input" v-model="agent.name" maxlength="25" placeholder="Название"
          />
        </div>
        <div class="field__item field__item-necessary">
          <input type="text" class="control-input" v-model="agent.inn"  maxlength="12" placeholder="ИНН" />
        </div>
        <div class="field__item field__item-necessary">
          <input type="text" class="control-input" maxlength="9" v-model="agent.kpp"  placeholder="КПП"/>
        </div>
        <div class="field__item field__item-necessary">
          <input type="text" class="control-input" maxlength="50" v-model="agent.address"  placeholder="Адрес" />
        </div>
        <div class="field__item">
          <input type="text" class="control-input" maxlength="11" v-model="agent.phone"  placeholder="Телефон"/>
          </div>
        <div class="field__item">
          <input type="text" class="control-input" maxlength="25" v-model="agent.email"  placeholder="Email"/>
          </div>
      </div>
      <!-- <AdditionalParams :params="agent.params"></AdditionalParams> -->
      <div class="buttons">
        <button class="btn1" @click="addAgent">Добавить</button>
        <button class="btn2" @click="$router.go(-1)">Назад</button>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, ref} from 'vue'
import AdditionalParams from '../components/AdditionalParams.vue';
import ErrorMessage from '../components/uiControls/ErrorMessage.vue';
export default {
    setup() {
        const agent = ref({
            id: 0,
            name: "",
            inn: "",
            kpp: '',
            address: "",
            phone: "",
            params: [
                { id: 0, name: "vk", value: "vk.com/tnv44" },
            ]
        });

        function addAgent(){

            
        }
        return {agent,addAgent};
    },
    components: { AdditionalParams, ErrorMessage }
};
</script>

<style scoped>
.control-win {
  max-width: 1000px;
  padding: 30px;
  color: var(--gray-secound);
  position: relative;
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
.field__item{
  width: 340px;
  display: flex;
}
.field__item-necessary::after {
  content: "*";
  color: #f79114;
  display: inline;
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