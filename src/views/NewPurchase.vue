<template>
  <div>
    <div class="control-win container">
        <header class="head">
          <h2 class="title1">Покупка</h2>
          <h2 class="title2">Операция №{{opNumber}}</h2>
        </header>
        <div class="field__items">
              <SelectBox :data="agents" @selectedItem="selectAgent"></SelectBox>
              <input v-model="datePicker" type="date" name="" id="">
              <InputPrice v-model:inputValue="price"></InputPrice>
        </div>
        <button @click="test">test</button>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import SelectBox from '../components/uiControls/SelectBox.vue';
import { ipcRenderer } from 'electron';
import {ref} from 'vue';
import InputPrice from '../components/uiControls/InputPrice.vue';
export default { 
  setup(){
    let opNumber = "add_this_operation_number";
    let price = ref(0);
    let agents = ref(null);
    let selectedAgent = null;
    let datePicker = ref(new Date().toISOString().substr(0,10))
    function selectAgent(agent){
        selectedAgent = agent;
    }
    onMounted(() => {
      ipcRenderer.send("get-all-agents");
      ipcRenderer.on("send-all-agents", (e, data) => {
        agents.value = data.map((item) => {
          return {
            id: item.id,
            name: item.name,
            inn: item.inn,
            address: item.address,
            phone: item.phone,
          };
        });
      });
    });
    function test(){
      console.log(price.value);
    }
    return {
      agents,
      selectedAgent,
      selectAgent,
      opNumber,
      datePicker,
      price,
      test
    }

  },
  components: { SelectBox, InputPrice } 
};
</script>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
}
.control-win {
  max-width: 1000px;
  padding: 30px;
  color: var(--gray-secound);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
}
</style>