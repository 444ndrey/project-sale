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
          <div></div>
          <div class="field">
            <label class="field-label">Цена: </label>
            <SelectBox :key="updateKey" :isHideSearch="true" class="field-select" :data="entities"></SelectBox>
          </div>
          <div class="field">
            <label class="field-label">Кол-во: </label>
            <input
              type="number"
              max="100000"
              maxlength="9"
              placeholder="Кол-во"
              class="control-input"
              v-model="amount"
            />
          </div>
          <div class="info-result">
            <p class="sum">Сумма: &#8381;{{ sum }}</p>
            <button class="btn1" @click="addProduct">Добавить</button>
          </div>
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
    let price = ref(0);
    let amount = ref(1);
    let entities = ref(null);
    let error = ref({
      messages: [],
      isActive: false,
    });
    let sum = computed(() => {
      return price.value * amount.value;
    });
    function selectProduct(prod) {
      product.value = null;
      updateKey.value++;
      product.value = prod;
      ipcRenderer.invoke("get-enities", prod.id).then((res) => {

          res = res.map(item => {
              item.name = `${item.amount} ${prod.unit} ${item.cost} руб.`
              return item;
          })
        entities.value = res;
      });
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
      if (
        price.value == 0 ||
        price.value == null ||
        amount.value == 0 ||
        amount.value == null
      ) {
        error.value.messages.push(
          "Цена и/или количество не могут быть пустыми или равны нулю."
        );
        error.value.isActive = true;
      } else {
        let value = {
          product: product.value,
          price: price.value,
          amount: amount.value,
          sum: sum.value,
        };
        ctx.emit("addProduct", value);
      }
    }
    return {
      products,
      selectProduct,
      price,
      product,
      amount,
      sum,
      addProduct,
      error,
      entities,
      updateKey,
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
  height: 140px;
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
  gap: 10px;
  width: 100%;
}
.field-label {
  color: var(--gray-main);
}
.field-select{
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
  width: 300px;
  justify-content: space-between;
}
.message-error {
  margin-bottom: 5px;
  padding: 3px;
}
</style>