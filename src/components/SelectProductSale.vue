<template>
  <div>
    <div class="message-error" v-if="error.isActive">
      <ul>
        <li v-for="item in error.messages" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="wrapper">
      <div>
        <label class="field-label">Номенклатура: </label>
        <SelectBox
          :data="products"
          :type="'product'"
          @selectedItem="selectProduct"
        ></SelectBox>
      </div>
      <div class="info" v-if="product != null">
        <div class="fields">
          <div class="field">
            <label class="field-label">Стоимость: </label>
            <SelectBox
              :key="updateKey"
              @selectedItem="selectEntity"
              :isHideSearch="true"
              class="field-select"
              :data="entities"
            ></SelectBox>
          </div>
          <div class="field">
            <label class="field-label">Кол-во: </label>
            <input
              type="number"
              @keypress="validateAmount"
              @input="validateAmount"
              v-model="amount"
              class="control-input"
            />
            <label class="field-label fixed">из {{ max }}</label>
          </div>
          <div class="field">
            <label class="field-label">по &#8381;{{ product.price }}</label>
          </div>
          <div class="field">
            <label class="field-label">Скидка: </label>
            <input
              type="number"
              class="control-input"
              disabled="true"
              placeholder="В разработке"
            />
          </div>
        </div>
        <div class="info-result">
          <button class="btn1" @click="addProduct">Добавить</button>
          <p class="sum">Сумма: &#8381;{{ sum }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectBox from "./uiControls/SelectBox.vue";
import InputPrice from "../components/uiControls/InputPrice.vue";
import { ref, onMounted, computed } from "vue";
import { ipcRenderer } from "electron";
export default {
  components: { SelectBox },
  emits: ["addProduct"],
  setup(props, ctx) {
    let updateKey = ref(0); // So strange method to update select cost component
    let products = ref(null);
    let product = ref(null);
    let selectedEntity = null;
    let amount = ref(1);
    let entities = ref(null);
    let max = ref(0);
    let error = ref({
      messages: [],
      isActive: false,
    });
    let sum = computed(() => {
      return parseFloat((product.value.price * amount.value).toFixed(2));
    });
    function selectProduct(prod) {
      max.value = 0;
      amount.value = 0;
      product.value = null;
      updateKey.value++;
      product.value = prod;
      ipcRenderer.invoke("get-enities", prod.id).then((res) => {
        res = res.map((item) => {
          item.name = `${item.amount} ${prod.unit} ${item.cost} руб.`;
          return item;
        });
        entities.value = res.filter((i) => i.amount > 0);
      });
    }
    function selectEntity(item) {
      selectedEntity = item;
      max.value = selectedEntity.amount;
    }
    onMounted(() => {
      ipcRenderer.invoke("get-all-products").then((res) => {
        products.value = res.map((item) => {
          return {
            id: item.id,
            name: item.name,
            code: item.code,
            price: parseFloat(item.price).toFixed(2),
            unit: item.unit,
          };
        });
      });
    });
    function addProduct() {
      error.value.isActive = false;
      error.value.messages = [];
      if (selectedEntity == null) {
        error.value.messages.push(
          "Выберите товар какой стоимости будет добавлен к продаже"
        );
      }
      if(amount.value < 1){
         error.value.messages.push(
          "Кол-во товара не может быть равно 0"
        );
      }
      if (error.value.messages.length > 0) {
        error.value.isActive = true;
      } else {
        let value = {
          product: product.value,
          entity: selectedEntity.id,
          amount: amount.value,
          sum: sum.value,
        };
        ctx.emit("addProduct", value);
      }
    }
    function validateAmount(e) {
      if (e.keyCode < 48 || e.keyCode > 57) {
        e.preventDefault();
      }
      if (e.target.value > max.value) {
        amount.value = max.value;
        return;
      }
      if (e.target.value < 0) {
        e.preventDefault();
        amount.value = 0;
      }
    }
    return {
      products,
      selectProduct,
      product,
      amount,
      sum,
      addProduct,
      error,
      entities,
      updateKey,
      selectEntity,
      max,
      validateAmount,
    };
  },
  components: { InputPrice, SelectBox },
};
</script>

<style scoped>
.wrapper {
  border: 1px solid var(--gray-main);
  border-radius: 15px;
  width: 100%;
  padding: 10px;
  height: 155px;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.field {
  display: flex;
  align-items: center;
  color: var(--gray-main);
  gap: 5px;
}
.control-input {
  max-width: 150px;
}
.fields {
  display: flex;
  gap: 15px;
  width: 100%;
  margin: 0;
}
.field-label {
  color: var(--gray-main);
  margin: 0;
}
.field-select {
  width: 200px;
  margin: 0;
}
.sum {
  font-weight: bold;
  margin: 0px;
  font-size: 18px;
}
.info-result {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}
.message-error {
  margin-bottom: 5px;
  padding: 3px;
}
.fixed {
  width: 50px;
}
</style>