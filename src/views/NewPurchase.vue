<template>
  <div>
    <div class="control-win container">
      <header class="head">
        <h2 class="title1">Покупка</h2>
        <h2 class="title2">Операция №{{ opNumber }}</h2>
      </header>
      <div class="field-items">
        <SelectBox
          :data="agents"
          :type="'agent'"
          @selectedItem="selectAgent"
        ></SelectBox>
        <input v-model="datePicker" type="date" name="" id="" />
        <button class="btn2" @click="isProductAddWin = !isProductAddWin">
          Добавить позицию
        </button>
        <SelectProductPurchase
          v-if="isProductAddWin"
          @addProduct="addProduct"
          class="selector"
        ></SelectProductPurchase>
        <div class="list-items-wrap">
          <div class="list-items">
            <p class="list-empty" v-if="products.length == 0">Список пуст</p>
            <div class="list-item" v-for="item in products" :key="item">
              <p class="list-item-text">
                {{ item.id }}) <b>{{ item.product.name }}</b>
              </p>
              <div>
                <p class="list-item-text">
                  Покупаем <b>{{ item.amount }} {{ item.product.unit }}</b> по
                  <b>&#8381;{{ item.price }}</b>
                </p>
              </div>
              <p class="list-item-text">
                Всего: <b>&#8381;{{ item.sum }}</b>
              </p>
            </div>
          </div>
        </div>
        <p class="title1">Cумма: &#8381;{{ sum }}</p>
        <div class="field-item">
          <label>Комментарий:</label>
          <textarea
            class="comment"
            maxlength="300"
            cols="30"
            rows="5"
          ></textarea>
        </div>
        <div class="buttons">
          <button class="btn1">Оформить</button>
          <button class="btn2" @click="$router.go(-1)">Назад</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import SelectBox from "../components/uiControls/SelectBox.vue";
import { ipcRenderer } from "electron";
import { ref } from "vue";
import SelectProductPurchase from "../components/SelectProductPurchase.vue";
export default {
  setup() {
    let opNumber = "add_this_operation_number";
    let price = ref(0);
    let isProductAddWin = ref(false);
    let agents = ref(null);
    let sum = computed(() => {
      if (products.value.length != 0) {
        let value = 0;
        products.value.forEach((el) => {
          value += el.sum;
        });
        return value;
      } else {
        return 0;
      }
    });
    let selectedAgent = null;
    let products = ref([]);
    let datePicker = ref(new Date().toISOString().substr(0, 10));
    function selectAgent(agent) {
      selectedAgent = agent;
    }
    function addProduct(value) {
      if (products.value.length == 0) {
        value.id = 1;
      } else {
        value.id = products.value[products.value.length - 1].id + 1;
      }
      products.value.push(value);
      isProductAddWin.value = false;
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
    return {
      agents,
      selectedAgent,
      selectAgent,
      opNumber,
      datePicker,
      price,
      isProductAddWin,
      addProduct,
      products,
      sum,
    };
  },
  components: { SelectBox, SelectProductPurchase },
};
</script>

<style scoped>
.head {
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
.list-items {
  height: 170px;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  margin-top: 10px;
  margin-bottom: 10px;
}
.list-items-wrap {
  border: 1px solid var(--gray-main);
  padding: 5px;
  border-radius: 10px;
}
.field-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btn2 {
  width: max-content;
}
.list-empty {
  align-items: center;
  color: var(--gray-main);
  width: 100%;
  text-align: center;
  font-size: 20px;
  user-select: none;
}
.list-item {
  padding: 7px 10px;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  display: flex;
  margin-bottom: 5px;
  gap: 10px;
  align-items: center;
}
.list-item-text {
  margin: 0;
}
.list-item:hover {
  background-color: #eeee;
}
.comment {
  outline: none;
  resize: none;
  width: 100%;
  border-radius: 10px;
  border-color: var(--gray-main);
  padding: 5px;
  color: var(--gray-secound);
  letter-spacing: 0.5px;
  max-height: 70px;
}
.comment:focus {
  border-color: var(--red-light);
  box-shadow: -1px 6px 15px 0px rgba(247, 92, 92, 0.2);
}
.field-item {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.field-item > label {
  color: var(--gray-main);
}
.buttons {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  align-items: center;
}
.title1{
  margin-bottom: 10px;
}
</style>